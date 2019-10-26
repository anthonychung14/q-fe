// @flow

import * as React from 'react';

import { Button as B } from 'antd-mobile';
import { TouchableOpacity } from 'react-native';

import COLORS from 'constants/colors';

const Button = ({
  handleClick,
  invalid,
  loading,
  icon,
  text,
  type = 'primary',
}) => (
  <TouchableOpacity disabled={invalid} type="submit" style={{ width: '100%' }}>
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
      onClick={handleClick}
    >
      {text}
    </B>
    {/* </button> */}
  </TouchableOpacity>
);

export default Button;
