import React from 'react';
import { compose, withState, withHandlers, withProps } from 'recompose';

import { List, Checkbox as C, WhiteSpace, WingBlank } from 'antd-mobile';

const { CheckboxItem } = C;

const makeHandleCheck = (handleCheck, item) => () => {
  handleCheck(item);
};

const Checkbox = ({ checked, checkboxValues, handleCheck, name, ...rest }) => (
  <WingBlank size="md">
    <WhiteSpace size="md" />
    <List renderHeader={() => name}>
      {checkboxValues.map(item => (
        <CheckboxItem
          key={`${item.label}-i`}
          onChange={makeHandleCheck(handleCheck, item)}
          checked={item.value === checked}
        >
          {item.label}
        </CheckboxItem>
      ))}
    </List>
  </WingBlank>
);

export default compose(
  withProps(({ values = [] }) => ({
    checkboxValues: values.map((v, i) => ({ value: i, label: v })),
  })),
  withState('checked', 'setSingleCheck', 0),
  withHandlers({
    handleCheck: ({ setSingleCheck, input }) => item => {
      input.onChange(item.label);
      setSingleCheck(item.value);
    },
  }),

  withHandlers({}),
)(Checkbox);
