import _ from 'lodash';
import React from 'react';
import { List } from 'antd-mobile';
import styled from 'styled-components';
import { compose, withProps } from 'recompose';
import { withFirebase, firebaseConnect } from 'react-redux-firebase';

import { View, Text } from 'react-native';

import { withOnSubmit } from 'containers/CreateResource/formEnhancers';
import { connectGoals } from 'selectors/goals';
import {
  connectFirebaseForm,
  withNutritionRemaining,
} from 'selectors/skill_mode';
import { getShortDate } from 'utils/time';

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

const RemainingColumn = ({ unit, remainingAmount }) => {
  return (
    <Column justify="end">
      <Text>{`${remainingAmount} ${unit}`}</Text>
    </Column>
  );
};

const NRCol = withNutritionRemaining(RemainingColumn);

const NutritionTotals = ({ activeGoal, goalCalories, subgoal }) =>
  subgoal === 'calories' ? (
    <Text>{goalCalories} cal</Text>
  ) : (
    <Text>{activeGoal.get(subgoal)} g</Text>
  );

export const NutritionData = ({
  cart,
  firebaseData,
  goalCalories,
  activeGoal,
}) => (
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
          {!cart.isEmpty() && <CartColumn cart={cart} subgoal={i} />}
          <NRCol
            cart={cart}
            goalCalories={goalCalories}
            subgoal={i}
            firebaseData={firebaseData}
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
);

export const NutritionTableParent = ({ children, cart, activeMode }) => {
  return (
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
            <div>{`${getShortDate()}`} </div>
            <div>{activeMode}</div>
          </HeaderColumn>
          {!cart.isEmpty() && (
            <HeaderColumn>
              <Text>in cart</Text>
            </HeaderColumn>
          )}

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
      {children}
    </List>
  );
};

const Table = props => {
  const { activeMode, cart, goalCalories, firebaseData, activeGoal } = props;

  return (
    <NutritionTableParent activeMode={activeMode} cart={cart}>
      <NutritionData
        activeGoal={activeGoal}
        cart={cart}
        firebaseData={firebaseData}
        goalCalories={goalCalories}
      />
    </NutritionTableParent>
  );
};

export default compose(
  connectGoals,
  withProps(({ googleUID, date }) => ({
    form: `nutrition/consumed/${googleUID}/${date}`,
  })),
  firebaseConnect(props => [props.form]),
  connectFirebaseForm,
  withFirebase,
  withOnSubmit,
)(Table);
