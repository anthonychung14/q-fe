import React from 'react';
import { compose } from 'recompose';
import { WhiteSpace, WingBlank, SegmentedControl } from 'antd-mobile';

import ViewHeader from 'components/ViewHeader';
import COLORS from 'constants/colors';

import { withSegmentState } from 'components/SegmentBar/enhancers';
// import { withOnSubmit } from '../AddCards/formEnhancers';
import ExecuteForm from './ExecuteForm';

const CycleSegments = ['Execute', 'React', 'Predict'];

/* eslint-disable react/prefer-stateless-function */
class CycleCards extends React.PureComponent {
  render() {
    const { activeIndex, handleSegmentChange } = this.props;
    return (
      <WingBlank size="md">
        <ViewHeader header="Cycle Cards" />
        <SegmentedControl
          onChange={handleSegmentChange}
          onValueChange={this.onValueChange}
          selectedIndex={activeIndex}
          tintColor={COLORS.primaryGreen}
          values={CycleSegments}
        />
        <WhiteSpace size="lg" />
        <ExecuteForm form="execute" />
        <WhiteSpace size="lg" />
      </WingBlank>
    );
  }
}
export default compose(withSegmentState)(CycleCards);
