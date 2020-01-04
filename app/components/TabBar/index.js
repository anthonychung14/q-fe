/*
 * TabBar
 *
 *
*/
import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

import { SegmentedControl } from 'antd-mobile';

import { connectActiveSegmentProps } from 'selectors/skill_mode';

const withSegmentState = compose(
  withState('activeIndex', 'updateIndex', 0),
  withHandlers({
    // onValueChange: ({ updateIndex }) => value => {
    //   updateIndex(value)
    // },
    handleSegmentChange: ({ updateIndex }) => e => {
      updateIndex(e.nativeEvent.selectedSegmentIndex);
    },
  }),
);

const TabBarComponent = ({
  activeForm,
  activeIndex,
  onChange,
  onValueChange,
  tintColor,
  values,
}) => (
  <SegmentedControl
    activeForm={activeForm}
    onChange={onChange}
    onValueChange={onValueChange}
    selectedIndex={activeIndex}
    values={values}
    tintColor={tintColor}
  />
);

const withModeSegmentProps = compose(
  connectActiveSegmentProps,
  withSegmentState,
);

const TabBar = withModeSegmentProps(TabBarComponent);

export default TabBar;
