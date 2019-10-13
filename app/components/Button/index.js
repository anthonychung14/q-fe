// @flow

import * as React from 'react';

import { Button as B } from 'antd-mobile';

import COLORS from 'constants/colors';

const Button = ({ invalid, loading, icon, text, type = 'primary' }) => (
  <button disabled={invalid} type="submit" style={{ width: '100%' }}>
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
  </button>
);

export default Button;
