import React from 'react';
import _ from 'lodash';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { compose, branch, renderNothing } from 'recompose';

const ItemWrapper = styled(View)`
  padding: 5px;
  margin: 5px;
`;

const ValueWrapper = styled(View)`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

class TimerIndicator extends React.Component {
  commitInput = _.debounce(() => {
    this.props.input.onChange(this.props.confirming[this.props.name]);
  }, 1500);

  render() {
    const { name, confirming } = this.props;

    if (_.has(confirming, name)) {
      this.commitInput();
      // remove the item from state
    }

    return (
      <ValueWrapper>
        <ItemWrapper>
          <ActivityIndicator />
        </ItemWrapper>
      </ValueWrapper>
    );
  }
}

export default compose(
  branch(
    ({ startedInput, input, confirming, name }) =>
      (input && input.value === 0) ||
      _.isNil(confirming[name]) ||
      startedInput ||
      input.value ||
      !input,
    renderNothing,
  ),
)(TimerIndicator);
