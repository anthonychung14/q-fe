import React from 'react';
import { withProps } from 'recompose';

import { WhiteSpace, WingBlank, Picker, List } from 'antd-mobile';
import './picker.css';

const withDisplayValue = withProps(({ input, label, pickerOptions }) => {
  let displayValue;
  if (!input.value) {
    displayValue = `Choose a ${label.toLowerCase()}`;
  } else {
    const foundOption = pickerOptions.find(i => i.value === input.value);
    displayValue = foundOption.label;
  }

  return {
    displayValue,
  };
});

const TypePicker = ({ displayValue, input, label, pickerOptions }) => (
  <WingBlank size="md">
    <label>{label}</label>
    <WhiteSpace size="md" />
    <Picker
      cols={1}
      data={pickerOptions}
      dismissText="Cancel"
      extra=" | "
      okText="Confirm"
      onOk={e => input.onChange(e[0])}
      title="Move Type"
    >
      <List.Item className="select-item" arrow="down">
        {displayValue}
      </List.Item>
    </Picker>
    <WhiteSpace size="md" />
  </WingBlank>
);

export default withDisplayValue(TypePicker);
