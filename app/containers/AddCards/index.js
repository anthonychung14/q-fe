/*
 * Add Card
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
*/
import React from 'react';
import { compose } from 'recompose';

import { SegmentedControl, WingBlank } from 'antd-mobile';

import { connectActiveSegmentProps } from 'selectors/skill_mode';
import { withSegmentState } from 'utils/enhancers';

import CreateResource from '../CreateResource';

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
            values={values}
            tintColor={tintColor}
          />
        </WingBlank>
        <CreateResource resourceType={activeForm} />
      </div>
    );
  }
}

const Enhanced = compose(
  connectActiveSegmentProps,
  withSegmentState,
);

const AddCards = Enhanced(AddCardsComponent);

export default AddCards;
