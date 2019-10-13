import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase, firebaseConnect } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form/immutable';
import get from 'lodash.get';

import { WhiteSpace, WingBlank } from 'antd-mobile';

import DropdownSelect from 'components/DropdownSelect';
import TextAreaInput from 'components/TextAreaInput';
import Button from 'components/Button';
// import SinglePicker from 'components/SinglePicker';
import SlidePicker from 'components/SlidePicker';

import { mapCombatMovesToOptions } from 'selectors/combat';
import { withOnSubmit } from './formEnhancers';

const FormHeader = ({ text }) => (
  <WingBlank size="md">
    <h3>Move: A unit of action</h3>
  </WingBlank>
);

const moveStyleOptions = [
  { value: 'ATK', label: 'Attack' },
  { value: 'DEF', label: 'Defend' },
  { value: 'TRK', label: 'Trick' },
  { value: 'MOV', label: 'Footwork' },
];

const MoveForm = props => {
  const {
    handleSubmit,
    invalid,
    loading,
    nameOptions,
    onSubmit,
    shorthandOptions,
  } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader />
      <Field
        name="movename"
        component={DropdownSelect}
        label="Name"
        props={{ dropdownOptions: nameOptions }}
      />
      <WhiteSpace size="md" />
      <Field
        name="shorthand"
        type="text"
        component={DropdownSelect}
        label="Shorthand"
        props={{ dropdownOptions: shorthandOptions }}
      />
      <WhiteSpace size="md" />
      <Field
        name="movetype"
        component={SlidePicker}
        label="Type"
        props={{ pickerOptions: moveStyleOptions }}
      />
      <WhiteSpace size="md" />
      <Field
        name="description"
        type="text"
        component={TextAreaInput}
        placeholder="Cues to keep in mind"
        label="Description"
      />
      <WhiteSpace />
      <Button
        invalid={invalid}
        loading={loading}
        icon="check-circle-o"
        text="Submit"
      />
    </form>
  );
};

const required = ['movename', 'shorthand', 'description'];
const multi = [];
const validateMoveValues = values => {
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
    'combatMove', // { path: '/todos' } // object notation
  ]),
  connect(
    mapCombatMovesToOptions,
    {},
  ),
  withFirebase,
  reduxForm({
    name: 'combatMove',
    validate: validateMoveValues,
  }),
  withOnSubmit,
)(MoveForm);
