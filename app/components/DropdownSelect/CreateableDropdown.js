import React from 'react';
import get from 'lodash.get';
import { withHandlers } from 'recompose';
import CreatableSelect from 'react-select/lib/Creatable';

const withDropdownHandlers = withHandlers({
  handleIsOptionDisabled: () => (option = '') =>
    option.label && !get(option, 'label', '').startsWith('Create'),

  handleChange: ({ onChange }) => newValue => {
    if (newValue) {
      const { value } = newValue;
      onChange(value);
    }
  },
});

const CreateableDropdown = ({
  handleChange,
  // handleInputChange,
  handleIsOptionDisabled,
  options,
}) => (
  <CreatableSelect
    isClearable
    isOptionDisabled={handleIsOptionDisabled}
    placeholder="Enter a unique value"
    onChange={handleChange}
    options={options}
  />
);

export default withDropdownHandlers(CreateableDropdown);
