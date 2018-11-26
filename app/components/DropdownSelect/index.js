import React from 'react';
import { WhiteSpace, WingBlank } from 'antd-mobile';

import CreateableDropdown from './CreateableDropdown';

const DropdownSelect = ({
  dropdownOptions,
  input,
  label,
  meta: { touched, error },
}) => (
  <WingBlank size="md">
    <label>{label}</label>
    <WhiteSpace size="md" />
    <CreateableDropdown {...input} options={dropdownOptions} />
    {touched && error && <span>{error}</span>}
  </WingBlank>
);

export default DropdownSelect;
