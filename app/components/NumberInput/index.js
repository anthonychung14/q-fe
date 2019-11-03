import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { compose, flattenProp } from 'recompose';

import TimerIndicator from 'components/TimerIndicator';
import COLORS from 'constants/colors';
import styled from 'styled-components';

const Outer = styled(TouchableOpacity)`
  display: flex;
  flex: 1;
  height: 100%;
  background-color: ${({ input, startedInput, highlight }) => {
    if (highlight) return COLORS.lightWhite;
    return !startedInput && input && typeof input.value === 'number'
      ? COLORS.lightBlue
      : '';
  }};
`;

const Inner = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
`;

class NumberInput extends React.Component {
  inputRef = null;

  setInputRef = (ref: ?HTMLElement) => {
    this.inputRef = ref;
  };

  handlePress = () => {
    // if there isn't a value, we immediately turn all boxes into NUMBERS
    // this is based on global redux state for the keypad reducer
    const {
      idx,
      inputKeypadValue,
      name,
      startedInput,
      startInput,
      type,
    } = this.props;
    if (!startedInput && type) {
      startInput(name);
    }

    if (startedInput) {
      inputKeypadValue(this.getKeyVal(idx));
    }
  };

  getKeyVal = idx => {
    if (idx === 9) return 0;
    return idx + 1;
  };

  render() {
    const {
      idx,
      input,
      confirming,
      name,
      fieldName,
      startedInput,
      type,
      renderHeader,
    } = this.props;

    if (!type && !startedInput) return null;

    return (
      <Outer
        onPress={this.handlePress}
        input={input}
        startedInput={startedInput}
        highlight={fieldName && startedInput}
      >
        <Inner>{startedInput ? this.getKeyVal(idx) : renderHeader}</Inner>
        <TimerIndicator
          name={name}
          confirming={confirming}
          input={input}
          startedInput={startedInput}
        />
      </Outer>
    );
  }
}

export default compose(flattenProp('opts'))(NumberInput);
