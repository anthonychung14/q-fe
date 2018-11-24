import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

import TextInput from 'components/TextInput';
import TextAreaInput from 'components/TextAreaInput';

const FormHeader = ({ text }) => (
  <WingBlank size="md">
    <h3>Style: Embodied by a character</h3>
    <h4>Each style has a specific win-condition</h4>
  </WingBlank>
);

const StyleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormHeader />
      <WhiteSpace />
      <Field
        name="stylename"
        type="text"
        component={TextInput}
        label="Style Name"
      />
      <WhiteSpace />
      <Field
        name="description"
        type="text"
        component={TextAreaInput}
        label="Description"
        placeholder="How the style wins the round"
      />
      <WhiteSpace />
      <Button icon="check-circle-o">Submit</Button>
    </form>
  );
};

export default reduxForm({
  form: 'combatStyle',
})(StyleForm);
