// @flow
import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { Map, List } from 'immutable';
import { branch, compose, withHandlers, withProps } from 'recompose';

import { WhiteSpace } from 'antd-mobile';
import Container from 'components/Container';
import Button from 'components/Button';
import Keypad from 'components/Keypad';
import FormField from './form_field';

export const renderField = (form, field, makeHeader, opts = {}) => (
  <FormField
    field={field}
    form={form}
    key={field.name}
    renderHeader={makeHeader(field.name)}
    many={field.many}
    name={field.name}
    opts={opts}
    {...field}
  />
);

const TextOrNumberField = ({
  textFields,
  textValues,
  form,
  numberFields,
  makeRenderFieldHeader,
}) => {
  // only display if there's one or the other
  if (textFields.length === Object.keys(textValues).length) {
    return (
      <Container>
        <Keypad
          columnNum={3}
          data={numberFields}
          form={form}
          makeRenderFieldHeader={makeRenderFieldHeader}
        />
      </Container>
    );
  }

  return (
    <Container>
      {textFields.map(field => renderField(form, field, makeRenderFieldHeader))}
    </Container>
  );
};

const allValues = (fields, textValues, numberValues) =>
  fields.filter(i => i.required).length <=
  Object.keys(textValues).length + Object.keys(numberValues).length;

const AddCardForm = ({
  fields,
  form,
  handleSubmit,
  invalid,
  makeRenderFieldHeader,
  processing,
  submitForm,
  submitLabel,
  textValues = {},
  numberValues = {},
}) => {
  // filter out the ones with type media
  const [mediaForm, otherFields] = _.partition(fields, ['type', 'media']);
  const firstMediaField = _.first(mediaForm);

  const [numberFields, nonNumberFields] = _.partition(
    otherFields,
    f => f.type === 'integer' || f.type === 'phoneNumber',
  );

  // TODO filter on area + check box
  const textFields = nonNumberFields;

  const onSubmit = handleSubmit(submitForm);

  const hasAllVals = allValues(fields, textValues, numberValues);

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <fieldset disabled={processing}>
          <TextOrNumberField
            numberFields={numberFields}
            textFields={textFields}
            textValues={textValues}
            form={form}
            makeRenderFieldHeader={makeRenderFieldHeader}
          />

          <WhiteSpace size="lg" />

          {hasAllVals && (
            <Button
              type="submit"
              loading={processing}
              icon="check-circle-o"
              handleClick={onSubmit}
              text={submitLabel || 'Submit'}
              disabled={processing || invalid}
            />
          )}
        </fieldset>
      </form>
      {/* {firstMediaField && (
        <FormField
          key={firstMediaField.name}
          field={firstMediaField}
          renderHeader={makeRenderFieldHeader(firstMediaField.name)}
          name={firstMediaField.name}
          many={firstMediaField.many}
        />
      )} */}
    </Container>
  );
};

const DynamicForm = branch(
  props => props.form === 'foodItem',
  compose(
    withProps(({ form }) => ({ selector: formValueSelector(form) })),
    connect((state, { selector, fields }) => ({
      textValues: selector(
        state,
        'ingredient',
        'supplier',
        'producer',
        'serving_unit',
        'food_type',
      ),
      numberValues: selector(
        state,
        ...fields.filter(i => i.type === 'integer').map(i => i.name),
      ),
    })),
  ),
)(AddCardForm);

class Form extends React.Component<Props> {
  componentWillMount() {
    const { form } = this.props;
    this.Form = reduxForm({
      form,
    })(DynamicForm);
  }

  componentDidUpdate() {
    const { form } = this.props;
    // reset(form);

    this.Form = reduxForm({
      form,
    })(DynamicForm);
  }

  shouldComponentUpdate(props) {
    return this.props.form !== props.form;
  }

  submit = values => {
    const { submitCallback, fields, resourceType } = this.props;

    // updates values
    const keyMap = _.keyBy(fields, 'name');
    const updatedValues = values.reduce((acc, val, key) => {
      const fieldData = keyMap[key];
      if (fieldData.type === 'resource' && !fieldData.unique) {
        return acc.set(`${keyMap[key].displayName}_id`, List.of(val));
      }

      return acc.set(key, val);
    }, Map());

    submitCallback(updatedValues, resourceType);
  };

  Form = null;

  render() {
    const { Form: ClassForm } = this;
    return (
      ClassForm && (
        <ClassForm
          key={this.props.form}
          {...this.props}
          submitForm={this.submit}
        />
      )
    );
  }
}

type Props = {
  fields: Array<Object>,
  form: string,
  handleSubmit: Function,
  initialize: Function,
  invalid: boolean,
  processing: boolean,
  resource: Object,
  resourceType: string,
  submitCallback: Function,
  submitLabel: string,
};

export default compose(
  withHandlers({
    makeRenderFieldHeader: () => name => (
      <label>{_.startCase(_.toLower(name))}</label>
    ),
  }),
)(Form);
