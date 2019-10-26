// @flow
import _ from 'lodash';
import * as React from 'react';
import { reduxForm } from 'redux-form/immutable';
import { Map, List } from 'immutable';
import { withHandlers } from 'recompose';

import { WingBlank, WhiteSpace } from 'antd-mobile';
import Button from 'components/Button';
import FormField from './form_field';

const renderField = (form, field, makeHeader) => (
  <FormField
    key={field.name}
    form={form}
    field={field}
    renderHeader={makeHeader(field.name)}
    name={field.name}
    many={field.many}
  />
);

const DynamicForm = ({
  fields,
  form,
  handleSubmit,
  submitForm,
  invalid,
  makeRenderFieldHeader,
  submitLabel,
  processing,
}) => {
  // filter out the ones with type media
  const [mediaForm, otherFields] = _.partition(fields, ['type', 'media']);
  const first = _.first(mediaForm);

  const onSubmit = handleSubmit(submitForm);

  return (
    <WingBlank size="md">
      <form onSubmit={onSubmit}>
        <fieldset disabled={processing}>
          <WingBlank size="md">
            <h3>Content</h3>
          </WingBlank>
          {otherFields.map(field =>
            renderField(form, field, makeRenderFieldHeader),
          )}
          <WhiteSpace size="lg" />
          <Button
            type="submit"
            loading={processing}
            icon="check-circle-o"
            text={submitLabel || 'Submit'}
            disabled={processing || invalid}
          />
        </fieldset>
      </form>
      {first && (
        <FormField
          key={first.name}
          field={first}
          renderHeader={makeRenderFieldHeader(first.name)}
          name={first.name}
          many={first.many}
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
    console.log('trying to render a form?', this.props);
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

export default withHandlers({
  makeRenderFieldHeader: () => name => <label>{name}</label>,
})(Form);
