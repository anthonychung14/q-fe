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
  width = '100%',
}) => (
  <TouchableOpacity
    disabled={invalid}
    onPress={handleClick || onSubmit}
    style={{ width }}
  >
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
  </TouchableOpacity>
);

export default Button;
