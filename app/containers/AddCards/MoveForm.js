import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

import DropdownSelect from 'components/DropdownSelect';
import TextAreaInput from 'components/TextAreaInput';

const FormHeader = ({ text }) => (
  <WingBlank size="md">
    <h3>Move: A unit of action</h3>
    <h4>Can be executed alone or in sequence</h4>
    <h4>Name and shorthand must be unique</h4>
  </WingBlank>
);

const MoveForm = props => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormHeader />
      <Field name="movename" component={DropdownSelect} label="Name" />
      <WhiteSpace size="md" />
      <Field
        name="shorthand"
        type="text"
        component={DropdownSelect}
        label="Shorthand"
      />
      <WhiteSpace />
      <Field
        name="description"
        type="text"
        component={TextAreaInput}
        placeholder="Cues to keep in mind"
        label="Description"
      />
      <WhiteSpace />
      <Button icon="check-circle-o">Submit</Button>
    </form>
  );
};

export default reduxForm({
  form: 'combatMove',
})(MoveForm);
