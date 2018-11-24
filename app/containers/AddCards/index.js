/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
*/

import React from 'react';
import { SegmentedControl, WingBlank, WhiteSpace } from 'antd-mobile';

import ViewHeader from 'components/ViewHeader';
import COLORS from 'constants/colors';

import MoveForm from './MoveForm';
import SequenceForm from './SequenceForm';
import StyleForm from './StyleForm';

const CombatSegments = ['Style', 'Move', 'Sequence'];

const CombatMoveForm = ({ activeForm }) => {
  const componentMap = {
    Move: MoveForm,
    Sequence: SequenceForm,
    Style: StyleForm,
  };
  const ComponentToRender = componentMap[activeForm];

  return <ComponentToRender />;
};

/* eslint-disable react/prefer-stateless-function */
export default class AddCards extends React.PureComponent {
  state = {
    activeIndex: 0,
    activeForm: CombatSegments[0],
  };

  onValueChange = value => {
    this.setState({ activeForm: value });
  };

  onChange = e => {
    const segIndex = e.nativeEvent.selectedSegmentIndex;
    this.setState({ activeIndex: segIndex });
  };

  render() {
    const { activeIndex, activeForm } = this.state;
    return (
      <WingBlank size="md">
        <WhiteSpace size="mid" />
        <ViewHeader header="Add New Card" />
        <SegmentedControl
          values={CombatSegments}
          tintColor={COLORS.primaryGreen}
          onChange={this.onChange}
          onValueChange={this.onValueChange}
          selectedIndex={activeIndex}
        />
        <WhiteSpace size="lg" />
        <CombatMoveForm activeForm={activeForm} />
      </WingBlank>
    );
  }
}
