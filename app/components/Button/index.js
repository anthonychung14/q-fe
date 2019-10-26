// @flow

import * as React from 'react';

import { Button as B } from 'antd-mobile';
import { TouchableOpacity } from 'react-native';

import COLORS from 'constants/colors';

const Button = ({
  handleClick,
  onSubmit,
  invalid,
  loading,
  icon,
  text,
  type = 'primary',
}) => (
  <TouchableOpacity
    disabled={invalid}
    onPress={handleClick || onSubmit}
    style={{ width: '100%' }}
  >
    {/* <button disabled={invalid} type="submit" style={{ width: '100%' }}> */}
    <B
      style={{
        backgroundColor: loading
          ? COLORS.primaryGreen
          : COLORS.buttonTypes[type],
      }}
      loading={loading}
      icon={icon}
      disabled={invalid}
    >
      {text}
    </B>
    {/* </button> */}
  </TouchableOpacity>
);

export default Button;
