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
import { SegmentedControl, WingBlank } from 'antd-mobile';

import COLORS from 'constants/colors';

import CreateResource from '../CreateResource';

// Updates to mode should trigger this render
// const CombatSegments = ['sequence', 'move', 'style'];
const KnowledgeSegments = ['excerpt', 'textSource', 'author'];

/* eslint-disable react/prefer-stateless-function */
export default class AddCards extends React.PureComponent {
  state = {
    activeIndex: 0,
    activeForm: KnowledgeSegments[0],
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
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <WingBlank size="md" style={{ paddingTop: '50px' }}>
          <SegmentedControl
            values={KnowledgeSegments}
            tintColor={COLORS.primaryGreen}
            onChange={this.onChange}
            onValueChange={this.onValueChange}
            selectedIndex={activeIndex}
          />
        </WingBlank>
        <CreateResource resourceType={activeForm} />
      </div>
    );
  }
}
