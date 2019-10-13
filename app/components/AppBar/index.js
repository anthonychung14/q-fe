import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { NavLink } from 'react-router-dom';

import NavPopover from 'components/NavPopover';
import COLORS from 'constants/colors';

const NavBarStyle = {
  backgroundColor: COLORS.primaryDark,
  borderBottom: `4px solid ${COLORS.accentGreen}`,
  position: 'fixed',
  width: '100%',
  zIndex: 4,
};

const AppBar = ({ handleDrawerToggle, drawerOpen }) => (
  <NavBar
    style={NavBarStyle}
    mode="dark"
    icon={<Icon type={drawerOpen ? 'left' : 'right'} />}
    onLeftClick={() => handleDrawerToggle(!drawerOpen)}
    rightContent={[<NavPopover key="Nav" />]}
  >
    <NavLink
      style={{ color: 'white' }}
      activeStyle={{ color: COLORS.greenAccent }}
      exact
      key="home"
      to="/"
    >
      Q
    </NavLink>
  </NavBar>
);

export default AppBar;
