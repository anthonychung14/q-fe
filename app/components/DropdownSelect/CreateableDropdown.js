import React, { Component } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';

/*
* if I have a prop called 'must be unique'
*   trigger an error if there are results
*      
*/
export default class CreateableDropdown extends Component {
  handleChange = (newValue, actionMeta) => {
    if (newValue) {
      const { value } = newValue;
      this.props.onChange(value);
    }
  };

  // handleInputChange = (inputValue, actionMeta) => {
  // console.group('Input Changed');
  // console.log(inputValue);
  // console.log(`action: ${actionMeta.action}`);
  // console.groupEnd();
  // };

  render() {
    const { options, value } = this.props;
    return (
      <CreatableSelect
        isClearable
        isOptionDisabled={option => !option.label.startsWith('Create')}
        placeholder="Enter a unique value"
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        options={options}
      />
    );
  }
}
