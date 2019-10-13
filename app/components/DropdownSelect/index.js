import React from 'react';
import { WhiteSpace, WingBlank } from 'antd-mobile';

import CreateableDropdown from './CreateableDropdown';
import MultiSelect from './MultiSelect';

const DropdownSelect = ({
  dropdownOptions,
  input,
  label,
  meta: { touched, error },
  multiSelect = false,
}) => (
  <WingBlank size="md">
    <label>{label}</label>
    <WhiteSpace size="md" />
    {multiSelect ? (
      <MultiSelect {...input} options={dropdownOptions} />
    ) : (
      <CreateableDropdown {...input} options={dropdownOptions} />
    )}
    {touched && error && <span>{error}</span>}
    <WhiteSpace size="lg" />
  </WingBlank>
);

export default DropdownSelect;
