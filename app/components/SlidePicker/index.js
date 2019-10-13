// @flow
import React from 'react';
import get from 'lodash.get';
import { compose, withHandlers, withProps } from 'recompose';
import { Slider, WingBlank, WhiteSpace } from 'antd-mobile';

const withSlidePicking = compose(
  withProps(({ input, pickerOptions }) => ({
    maxSlideLength: pickerOptions.length - 1,
    currentValue: get(input, 'value.label', get(pickerOptions, '0.label')),
  })),
  withHandlers({
    handleSlideChange: ({ input, pickerOptions }) => index => {
      input.onChange(get(pickerOptions, [index, 'value']));
    },
  }),
);

// map the options onto an array
const SlidePicker = ({
  currentValue,
  handleSlideChange,
  label,
  maxSlideLength,
}) => (
  <WingBlank size="lg">
    <label>{label}</label>
    <WhiteSpace size="md" />
    <Slider
      style={{ marginLeft: 30, marginRight: 30 }}
      defaultValue={0}
      min={0}
      max={maxSlideLength}
      onChange={handleSlideChange}
    />
    <WhiteSpace size="lg" />
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {currentValue}
    </div>
  </WingBlank>
);

export default withSlidePicking(SlidePicker);
