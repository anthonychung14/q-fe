import React from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form/immutable';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import { firebaseConnect } from 'react-redux-firebase';

import Button from 'components/Button';
import SlidePicker from 'components/SlidePicker';
import DropdownSelect from 'components/DropdownSelect';

import { mapCombatToProps } from 'selectors/combat';
import { withOnSubmit } from './formEnhancers';

const FormHeader = () => (
  <WingBlank size="md">
    <h3>Sequence: A combination of moves</h3>
  </WingBlank>
);

const SEQTYPE_OPTIONS = [
  { value: 'EVD', label: 'Evade' },
  { value: 'CTR', label: 'Counter' },
  { value: 'PRO', label: 'Provoke' },
  { value: 'DST', label: 'Distract' },
  { value: 'POW', label: 'Power' },
];

const SequenceForm = props => {
  const {
    combatMoveOptions,
    combatStyleOptions,
    handleSubmit,
    invalid,
    loading,
    nameOptions,
    onMultiSubmit,
    // pristine,
    // reset,
    // submitting,
  } = props;
  return (
    <form onSubmit={handleSubmit(onMultiSubmit)}>
      <FormHeader />
      <Field
        name="sequencename"
        component={DropdownSelect}
        label="Name"
        props={{ dropdownOptions: nameOptions }}
      />
      <Field
        name="sequencemoves"
        component={DropdownSelect}
        label="Moves"
        props={{ dropdownOptions: combatMoveOptions, multiSelect: true }}
      />
      <Field
        name="sequencestyle"
        component={SlidePicker}
        label="Style"
        props={{ pickerOptions: combatStyleOptions }}
      />
      <Field
        name="purpose"
        component={SlidePicker}
        label="Purpose"
        props={{ pickerOptions: SEQTYPE_OPTIONS }}
      />

      <WhiteSpace size="md" />
      <Button
        invalid={invalid}
        loading={loading}
        icon="check-circle-o"
        text="Submit"
      />
    </form>
  );
};

const required = ['sequencename'];
const multi = ['sequencemoves'];
const validateSequenceValues = values => {
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
  firebaseConnect([
    'combatStyles', // { path: '/todos' } // object notation,
    'combatMove',
    'combatSequence',
  ]),
  connect(
    mapCombatToProps,
    {},
  ),
  reduxForm({
    name: 'combatSequence',
    validate: validateSequenceValues,
  }),
  withOnSubmit,
)(SequenceForm);
