import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase, firebaseConnect } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form/immutable';
import get from 'lodash.get';

import { Button, WhiteSpace, WingBlank, Picker, List } from 'antd-mobile';

import DropdownSelect from 'components/DropdownSelect';
import TextAreaInput from 'components/TextAreaInput';

import { withOnSubmit } from './formEnhancers';
import { getCombatMovesFromFirebase } from './selectors';

const FormHeader = ({ text }) => (
  <WingBlank size="md">
    <h3>Move: A unit of action</h3>
    <h4>Can be executed alone or in sequence</h4>
  </WingBlank>
);

const moveStyleOptions = [
  { value: 'ATK', label: 'Attack' },
  { value: 'DEF', label: 'Defend' },
  { value: 'FNT', label: 'Feint' },
  { value: 'MOV', label: 'Footwork' },
];

const TypePicker = ({ input }) => (
  <WingBlank size="md">
    <label>Type</label>
    <WhiteSpace size="md" />
    <Picker
      cols={1}
      data={moveStyleOptions}
      dismissText="Cancel"
      extra=" | "
      okText="Confirm"
      onDismiss={e => console.log('dismiss', e)}
      onOk={e => input.onChange(e[0])}
      onPickerChange={e => console.log('change', e)}
      title="Move Type"
    >
      <List.Item arrow="down">{input.value || 'Choose a value'}</List.Item>
    </Picker>
  </WingBlank>
);

const MoveForm = props => {
  const { handleSubmit, onSubmit, nameOptions, shorthandOptions } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader />
      <Field name="movetype" component={TypePicker} label="Type" />
      <WhiteSpace size="md" />
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
        name="description"
        type="text"
        component={TextAreaInput}
        placeholder="Cues to keep in mind"
        label="Description"
      />
      <WhiteSpace />
      <button type="submit" style={{ width: '100%' }}>
        <Button icon="check-circle-o">Submit</Button>
      </button>
    </form>
  );
};

const mapCombatMovesToOptions = state => {
  const combatMoves = getCombatMovesFromFirebase(state);
  return {
    nameOptions: combatMoves.map(move => {
      const moveId = get(move, 'key');
      return { value: moveId, label: get(move, ['value', 'movename']) };
    }),
    shorthandOptions: combatMoves.map(move => {
      const moveId = get(move, 'key');
      return { value: moveId, label: get(move, ['value', 'shorthand']) };
    }),
  };
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
  }),
  withOnSubmit,
)(MoveForm);
