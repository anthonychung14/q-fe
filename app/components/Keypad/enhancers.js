import { connect } from 'react-redux';

export const connectKeypad = connect(
  state => ({
    startedInput: state.getIn(['keypad', 'startedInput']),
    keypadInput: state.getIn(['keypad', 'input']),
    fieldName: state.getIn(['keypad', 'fieldName']),
  }),
  {
    startInput: fieldname => dispatch => {
      dispatch({
        type: 'keypad/START_INPUT',
        payload: {
          fieldname,
        },
      });
    },
    inputKeypadValue: value => dispatch => {
      dispatch({
        type: 'keypad/INPUT',
        payload: {
          value,
        },
      });
    },
    clearKeypad: () => dispatch => {
      dispatch({
        type: 'keypad/CLEAR',
      });
    },
    keypadUndo: () => dispatch => {
      dispatch({
        type: 'keypad/UNDO',
      });
    },
  },
);
