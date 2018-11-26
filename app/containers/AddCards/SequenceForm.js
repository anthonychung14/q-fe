import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form/immutable';
import { Picker, List, WingBlank } from 'antd-mobile';

import { firebaseConnect } from 'react-redux-firebase';

const { Item } = List;

const FormHeader = ({ text }) => (
  <WingBlank size="md">
    <h3>Sequence: A short combination of moves</h3>
    <h4>Each style has a set of sequences</h4>
  </WingBlank>
);

const SequenceForm = props => {
  const {
    combatStyleOptions,
    handleSubmit,
    pristine,
    reset,
    submitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormHeader />
      <Picker
        cols={1}
        data={combatStyleOptions}
        dismissText="Cancel"
        extra="Choose"
        okText="Confirm"
        onDismiss={e => console.log('dismiss', e)}
        onOk={e => console.log('ok', e)}
        onPickerChange={e => console.log('change', e)}
        title="Name"
      >
        <Item arrow="down">Style</Item>
      </Picker>
    </form>
  );
};

const getCombatStylesFromFirebase = state => {
  const firebase = state.get('firebase');
  const combatStyles = get(firebase, ['ordered', 'combatStyles'], []);

  return combatStyles.map(style => ({
    label: get(style, ['value', 'stylename']),
    value: get(style, 'key'),
  }));
};

const mapCombatStylesToOptions = state => ({
  combatStyleOptions: getCombatStylesFromFirebase(state),
});

export default compose(
  firebaseConnect([
    'combatStyles', // { path: '/todos' } // object notation
  ]),
  connect(
    mapCombatStylesToOptions,
    {},
  ),
  reduxForm({
    name: 'combatSequence',
  }),
)(SequenceForm);
