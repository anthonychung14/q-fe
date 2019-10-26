import React from 'react';
import { WhiteSpace, List, WingBlank, TextareaItem } from 'antd-mobile';

const TextArea = ({
  input,
  placeholder,
  label,
  type,
  renderHeader,
  meta: { touched, error },
}) => (
  <WingBlank size="md">
    <WhiteSpace size="md" />
    <List renderHeader={renderHeader}>
      <TextareaItem {...input} rows={3} count={150} placeholder={placeholder} />
    </List>
  </WingBlank>
);

export default TextArea;
