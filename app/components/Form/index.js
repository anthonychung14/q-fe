// @flow
import _ from 'lodash';
import * as React from 'react';
import { reduxForm } from 'redux-form/immutable';
import { Map, List } from 'immutable';
import { compose, withHandlers } from 'recompose';

import { WingBlank, WhiteSpace } from 'antd-mobile';
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

const DynamicForm = ({
  fields,
  form,
  handleSubmit,
  invalid,
  makeRenderFieldHeader,
  processing,
  submitForm,
  submitLabel,
}) => {
  // filter out the ones with type media
  const [mediaForm, otherFields] = _.partition(fields, ['type', 'media']);
  const firstMediaField = _.first(mediaForm);

  const [numberFields, textFields] = _.partition(otherFields, [
    'type',
    'integer',
  ]);

  const onSubmit = handleSubmit(submitForm);

  return (
    <WingBlank size="md">
      <form onSubmit={onSubmit}>
        <fieldset disabled={processing}>
          <WingBlank size="md">
            <h3>Text Content</h3>
          </WingBlank>
          {textFields.map(field =>
            renderField(form, field, makeRenderFieldHeader),
          )}
          <Keypad
            columnNum={3}
            data={numberFields}
            form={form}
            makeRenderFieldHeader={makeRenderFieldHeader}
          />

          <WhiteSpace size="lg" />
          <Button
            type="submit"
            loading={processing}
            icon="check-circle-o"
            handleClick={onSubmit}
            text={submitLabel || 'Submit'}
            disabled={processing || invalid}
          />
        </fieldset>
      </form>
      {firstMediaField && (
        <FormField
          key={firstMediaField.name}
          field={firstMediaField}
          renderHeader={makeRenderFieldHeader(firstMediaField.name)}
          name={firstMediaField.name}
          many={firstMediaField.many}
        />
      )}
    </WingBlank>
  );
};

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
