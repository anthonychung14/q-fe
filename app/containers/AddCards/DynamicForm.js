import React from 'react';
import { reduxForm } from 'redux-form/immutable';

export default class DynamicForm extends React.Component {
  componentWillMount() {
    const { dynamicName, DynamicFormComponent } = this.props;
    this.Form = reduxForm({
      form: dynamicName,
    })(DynamicFormComponent);
  }

  render() {
    const { Form } = this;
    const { dynamicName } = this.props;
    console.log('does it change');
    return <Form key={dynamicName} {...this.props} />;
  }
}
