import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

export default class MultiSelectDropdown extends Component {
  handleChange = newValue => {
    if (newValue.length) {
      this.props.onChange(newValue);
    }

    setTimeout(() => {
      this.selectRef.setState({ menuIsOpen: true });
    }, 10);
  };

  selectRef = null;

  setSelectRef = ref => {
    this.selectRef = ref;
  };

  render() {
    const { options, value } = this.props;
    return (
      <Select
        closeMenuOnSelect={false}
        components={makeAnimated()}
        isClearable={false}
        isMulti
        hideSelectedOptions={false}
        onChange={this.handleChange}
        options={options}
        placeholder="Choose moves"
        ref={this.setSelectRef}
      />
    );
  }
}
