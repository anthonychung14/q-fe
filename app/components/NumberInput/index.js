import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import { TouchableOpacity, TextInput, View } from 'react-native';
import { compose, withHandlers } from 'recompose';

import styled from 'styled-components';

const Outer = styled(TouchableOpacity)`
  display: flex;
  flex: 1;
  height: 100%;
`;

const Inner = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
`;

/**
  default
  number-pad
  decimal-pad
  numeric
  email-address
  phone-pad
*/

/**
display: flex;
    /* flex-grow: 1; */

// const withForwardingRef = BaseComponent =>
//   React.forwardRef((props, ref) => (
//     <BaseComponent {...props} forwardedRef={ref} />
//   ));

// const InputWithRef = withForwardingRef(TextInput);

class NumberInput extends React.Component {
  inputRef = null;

  setInputRef = (ref: ?HTMLElement) => {
    this.inputRef = ref;
  };

  handlePress = () => {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  render() {
    const {
      input,
      keyboardType = 'number-pad',
      label,
      meta = {},
      opts = {},
      renderHeader,
    } = this.props;

    return (
      <Outer onPress={this.handlePress}>
        <Inner>
          {renderHeader}
          <WhiteSpace size="lg" />
          <TextInput
            {...input}
            {...opts}
            keyboardType={keyboardType}
            ref={this.setInputRef}
            placeholder={label}
            meta={meta}
          />
        </Inner>
      </Outer>
    );
  }
}

export default compose()(NumberInput);
