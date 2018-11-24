import React from 'react';
import { InputItem, WhiteSpace, WingBlank } from 'antd-mobile';

const TextInputField = ({ input, label, type, meta: { touched, error } }) => (
  <WingBlank size="md">
    <label>{label}</label>
    <WhiteSpace size="md" />
    <div>
      <InputItem {...input} placeholder="Enter description" />
      {touched && error && <span>{error}</span>}
    </div>
  </WingBlank>
);

export default TextInputField;
