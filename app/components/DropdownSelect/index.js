import React from 'react';
import { WhiteSpace, WingBlank } from 'antd-mobile';

import CreateableDropdown from './CreateableDropdown';

const DropdownSelect = ({ input, label, type, meta: { touched, error } }) => (
  <WingBlank size="md">
    <label>{label}</label>
    <WhiteSpace size="md" />
    <CreateableDropdown {...input} />
    {touched && error && <span>{error}</span>}
  </WingBlank>
);

export default DropdownSelect;
