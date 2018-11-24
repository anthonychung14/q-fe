import React from 'react';
import { WingBlank, TextareaItem } from 'antd-mobile';

const TextArea = ({
  input,
  placeholder,
  label,
  type,
  meta: { touched, error },
}) => (
  <WingBlank size="md">
    <label>{label}</label>
    <TextareaItem {...input} rows={5} count={100} placeholder={placeholder} />
  </WingBlank>
);

export default TextArea;
