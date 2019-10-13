import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { compose } from 'recompose';
import { withFirebase } from 'react-redux-firebase';
import get from 'lodash.get';
import { WhiteSpace, WingBlank } from 'antd-mobile';

import Button from 'components/Button';
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
  const { handleSubmit, invalid, onSubmit, loading } = props;
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

      <Button
        invalid={invalid}
        loading={loading}
        icon="check-circle-o"
        text="Submit"
      />
    </form>
  );
};

const required = ['stylename', 'description'];
const multi = [];
const validateStyleValues = values => {
  const errors = {};
  required.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  multi.forEach(field => {
    if (!get(values, [field, 'length'], 0)) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

export default compose(
  withFirebase,
  reduxForm({
    name: 'combatStyles',
    validate: validateStyleValues,
  }),
  withOnSubmit,
)(StyleForm);
