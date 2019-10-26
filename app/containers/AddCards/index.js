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
import _ from 'lodash';
import React from 'react';
import { compose, withState, branch, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { SegmentedControl, WingBlank } from 'antd-mobile';
import COLORS from 'constants/colors';
import { getActiveMode } from 'selectors/skillMode';

import CreateResource from '../CreateResource';

const withSegmentState = compose(
  withState('activeForm', 'onValueChange', props => _.first(props.values)),
  withState('activeIndex', 'onIndexChange', 0),
  withHandlers({
    onChange: ({ onIndexChange }) => e => {
      onIndexChange(e.nativeEvent.selectedSegmentIndex);
    },
  }),
);

// Updates to mode should trigger this render
const KnowledgeSegments = ['excerpt', 'textSource', 'author'];
const NutritionSegments = ['foodItem', 'meal', 'author'];
// const CombatSegments = ['sequence', 'move', 'style'];
// const LoveSegments = ['plan', 'interaction', 'character'];
// const StrengthSegments = ['sequence', 'move', 'style'];

class AddCardsComponent extends React.PureComponent {
  render() {
    const {
      activeForm,
      activeIndex,
      onChange,
      onValueChange,
      tintColor,
      values,
    } = this.props;
    // let resource = activeForm;
    // if (resource === 'supplier' || resource === 'creator') {
    //   resource = 'author';
    // }

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
            activeForm={activeForm}
            onChange={onChange}
            onValueChange={onValueChange}
            selectedIndex={activeIndex}
            tintColor={tintColor}
            values={values}
          />
        </WingBlank>
        <CreateResource resourceType={activeForm} />
      </div>
    );
  }
}

const Enhanced = compose(
  connect(state => ({ activeMode: getActiveMode(state) })),
  branch(
    ({ activeMode }) => activeMode !== 'nutrition',
    withProps({
      values: KnowledgeSegments,
      tintColor: COLORS.primaryGreen,
    }),
    withProps({
      values: NutritionSegments,
      tintColor: COLORS.primaryBlue,
    }),
  ),
  withSegmentState,
);

const AddCards = Enhanced(AddCardsComponent);

export default AddCards;
