import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { firebaseConnect } from 'react-redux-firebase';

import SlidePicker from 'components/SlidePicker';
import { mapCombatToProps } from 'selectors/combat';

import { withOnSubmit } from '../CreateResource/formEnhancers';

/* eslint-disable react/prefer-stateless-function */
class ExecuteForm extends React.PureComponent {
  render() {
    const {
      activeIndex,
      combatStyleOptions,
      handleSubmit,
      onCycleStart,
    } = this.props;
    return (
      <form>
        <Field
          name="cyclestyle"
          component={SlidePicker}
          label="Style"
          props={{ pickerOptions: combatStyleOptions }}
        />
      </form>
    );
  }
}
export default compose(
  firebaseConnect([
    'combatStyles', // { path: '/todos' } // object notation,
    'combatMove',
  ]),
  connect(
    mapCombatToProps,
    {},
  ),
  reduxForm({
    name: 'cycleForm',
  }),
  withOnSubmit,
)(ExecuteForm);
/* 
.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
*/
