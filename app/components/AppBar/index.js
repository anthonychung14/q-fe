// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';

import { NavBar } from 'antd-mobile';
import NavPopover from 'components/NavPopover';

import COLORS from 'constants/colors';

const AppBar = () => (
  <NavBar
    style={{
      backgroundColor: COLORS.primaryDark,
      borderBottom: `4px solid ${COLORS.accentGreen}`,
    }}
    mode="dark"
    leftContent={[
      <NavLink
        style={{ color: 'white' }}
        activeStyle={{ fontWeight: 'bold', color: 'white' }}
        exact
        key="home"
        to="/"
      >
        Home
      </NavLink>,
    ]}
    rightContent={[<NavPopover key="Nav" />]}
  >
    Q
  </NavBar>
);

export default AppBar;
