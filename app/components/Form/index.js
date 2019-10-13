// @flow
import _ from 'lodash';
import * as React from 'react';
import { reduxForm } from 'redux-form/immutable';
import { Map, List } from 'immutable';
import { withHandlers } from 'recompose';

import { WingBlank, WhiteSpace } from 'antd-mobile';
import Button from 'components/Button';
import FormField from './form_field';

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
  const fieldRows = _.map(fields, field => (
    <FormField
      key={field.name}
      form={form}
      field={field}
      renderHeader={makeRenderFieldHeader(field.name)}
      name={field.name}
      many={field.many}
    />
  ));

  const onSubmit = handleSubmit(submitForm);

  return (
    <form onSubmit={onSubmit}>
      <WingBlank size="md">
        <fieldset disabled={processing}>
          {fieldRows}
          <WhiteSpace size="lg" />
          <Button
            type="submit"
            loading={processing}
            icon="check-circle-o"
            text={submitLabel || 'Submit'}
            disabled={processing || invalid}
          />
        </fieldset>
      </WingBlank>
    </form>
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
    const { Form } = this;
    return (
      Form && (
        <Form key={this.props.form} {...this.props} submitForm={this.submit} />
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
