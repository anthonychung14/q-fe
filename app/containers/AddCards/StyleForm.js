import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { compose } from 'recompose';
import { withFirebase } from 'react-redux-firebase';

import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

import TextInput from 'components/TextInput';
import TextAreaInput from 'components/TextAreaInput';
import { withOnSubmit } from './formEnhancers';

const FormHeader = ({ text }) => (
  <WingBlank size="md">
    <h3>Style: Embodied by a character</h3>
    <h4>Each style has a specific win-condition</h4>
  </WingBlank>
);

const StyleForm = props => {
  // const { handleSubmit, pristine, reset, submitting, onSubmit } = props;
  const { handleSubmit, onSubmit } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button type="submit" style={{ width: '100%' }}>
        <Button icon="check-circle-o">Submit</Button>
      </button>
    </form>
  );
};

export default compose(
  withFirebase,
  reduxForm({
    name: 'combatStyle',
  }),
  withOnSubmit,
)(StyleForm);
