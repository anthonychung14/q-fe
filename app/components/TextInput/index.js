import React from 'react';
import { List, InputItem, WhiteSpace, WingBlank } from 'antd-mobile';

const TextInput = ({
  input,
  label,
  renderHeader,
  meta = {},
  forwardedRef,
  opts = {},
}) => (
  <WingBlank size="md">
    <WhiteSpace size="md" />
    <List renderHeader={renderHeader}>
      <InputItem
        {...input}
        {...opts}
        ref={forwardedRef}
        placeholder={label}
        error={meta.touched && meta.error}
      />
    </List>
  </WingBlank>
);

export default TextInput;
