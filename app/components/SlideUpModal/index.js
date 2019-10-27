import _ from 'lodash';
import React from 'react';
import { Modal, List } from 'antd-mobile';
import { compose, withProps } from 'recompose';
import styled from 'styled-components';

import { withFirebase, firebaseConnect } from 'react-redux-firebase';
import { withOnSubmit } from 'containers/CreateResource/formEnhancers';

import { View, Text } from 'react-native';
import Button from 'components/Button';
import { connectGoals } from 'selectors/goals';
import { formatUnixTimestamp, currentTimeSeconds } from 'utils/time';

const Column = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start
  flex-direction: column;
  justify-content: ${({ justify }) => {
    switch (justify) {
      case 'end':
        return 'flex-end';
      case 'center':
        return 'center';
      default:
        return 'flex-start';
    }
  }};
`;

const HeaderColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${({ align }) =>
    align === 'start' ? 'flex-start' : 'flex-end'};
  align-items: ${({ align }) =>
    align === 'start' ? 'flex-start' : 'flex-end'};
`;

const CartColumn = ({ cart, subgoal }) => {
  const text = cart.reduce((acc, curr) => {
    const key =
      subgoal !== 'calories'
        ? _.camelCase(['grams', subgoal])
        : _.camelCase([subgoal, 'atwater']);

    const next = curr[key];
    return acc + next;
  }, 0);

  return (
    <Column justify="end">
      <Text>{`${text} g`}</Text>
    </Column>
  );
};

const RemainingColumn = ({ activeGoal, cart, goalCalories, subgoal }) => {
  const text = cart.reduce((acc, curr) => {
    const key =
      subgoal !== 'calories'
        ? _.camelCase(['grams', subgoal])
        : _.camelCase([subgoal, 'atwater']);

    const next = acc - curr[key];
    return next;
  }, activeGoal.get(subgoal, goalCalories));

  return (
    <Column justify="end">
      <Text>{`${text} g`}</Text>
    </Column>
  );
};

const NutritionTotals = ({ activeGoal, goalCalories, subgoal }) =>
  subgoal === 'calories' ? (
    <Text>{goalCalories} cal</Text>
  ) : (
    <Text>{activeGoal.get(subgoal)} g</Text>
  );

class SlideUpModal extends React.Component {
  handleConfirm = () => {
    this.props.onBulkSubmit(this.props.cart.toJS());
    this.props.closeModal();
  };

  handleUndo = () => {
    this.props.dispatch({
      type: 'card/EMPTY_RECENT_CART',
    });
    this.props.closeModal();
  };

  handleLater = () => {
    this.props.closeModal();
  };

  render() {
    const {
      activeGoal,
      activeMode,
      cart,
      goalCalories,
      maskClosable,
      visible,
    } = this.props;
    return (
      <Modal
        animationType="slide-up"
        maskClosable={maskClosable}
        popup
        transparent
        visible={visible}
      >
        <List
          renderHeader={() => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <HeaderColumn align="start">
                <div>
                  {`${formatUnixTimestamp(currentTimeSeconds(), 'short_date')}`}{' '}
                </div>
                <div>{activeMode}</div>
              </HeaderColumn>
              <HeaderColumn>
                <Text>in cart</Text>
              </HeaderColumn>
              <HeaderColumn>
                <Text>remaining</Text>
              </HeaderColumn>
              <HeaderColumn>
                <Text>daily goal</Text>
              </HeaderColumn>
            </View>
          )}
          className="popup-list"
        >
          <View
            style={{
              display: 'flex',
            }}
          >
            {['protein', 'fat', 'carb', 'calories'].map(i => (
              // This will eventually be your x req - this

              <List.Item key={`${i}-`}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Column>
                    <Text>{i}</Text>
                  </Column>
                  <CartColumn cart={cart} subgoal={i} />
                  <RemainingColumn
                    cart={cart}
                    goalCalories={goalCalories}
                    subgoal={i}
                    activeGoal={activeGoal}
                  />
                  <Column justify="end">
                    <NutritionTotals
                      activeGoal={activeGoal}
                      subgoal={i}
                      goalCalories={goalCalories}
                    />
                  </Column>
                </View>
              </List.Item>
            ))}
          </View>

          <List.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flex: 1,
              }}
            >
              <Button
                type="cancel"
                handleClick={this.handleUndo}
                icon="cross-circle-o"
                width="30%"
              />
              <Button
                type="outline"
                handleClick={this.handleLater}
                icon="down"
                width="30%"
              />
              <Button
                type="primary"
                handleClick={this.handleConfirm}
                icon="check-circle"
                width="30%"
              />
            </div>
          </List.Item>
        </List>
      </Modal>
    );
  }
}

export default compose(
  connectGoals,
  withProps(({ activeMode }) => ({ form: `${activeMode}/consumed` })),
  firebaseConnect(props => [props.form]),
  withFirebase,
  withOnSubmit,
)(SlideUpModal);
