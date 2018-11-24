import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Picker, List, WingBlank } from 'antd-mobile';

const { Item } = List;

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const stub = [
  { label: 'Stanionis the Turtle', value: 'Stanionis the Turtle' },
  { label: 'Toney', value: 'Toney' },
];

const FormHeader = ({ text }) => (
  <WingBlank size="md">
    <h3>Sequence: A special combination</h3>
    <h4>Each style has a set of sequences</h4>
  </WingBlank>
);

const SequenceForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormHeader />
      <Picker
        cols={1}
        data={stub}
        dismissText="Cancel"
        extra="Choose"
        okText="Confirm"
        onDismiss={e => console.log('dismiss', e)}
        onOk={e => console.log('ok', e)}
        onPickerChange={e => console.log('change', e)}
        title="Name"
      >
        <Item arrow="horizontal">Style</Item>
      </Picker>
    </form>
  );
};

export default reduxForm({
  form: 'combatSequence',
})(SequenceForm);
