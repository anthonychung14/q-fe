import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { NavLink } from 'react-router-dom';

import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import NavPopover from 'components/NavPopover';
import COLORS from 'constants/colors';
import { getActiveMode } from 'selectors/skillMode';

const AppBar = ({ navBarStyle, handleDrawerToggle, drawerOpen }) => (
  <NavBar
    style={navBarStyle}
    mode="dark"
    icon={<Icon type={drawerOpen ? 'left' : 'right'} />}
    onLeftClick={() => handleDrawerToggle(!drawerOpen)}
    rightContent={[<NavPopover key="Nav" />]}
  >
    <NavLink style={{ color: 'white' }} exact key="home" to="/">
      Q
    </NavLink>
  </NavBar>
);

export default compose(
  connect(state => ({ activeMode: getActiveMode(state) })),
  withProps(({ activeMode }) => ({
    navBarStyle: {
      backgroundColor:
        activeMode !== 'nutrition' ? COLORS.primaryDark : COLORS.darkBlue,
      borderBottom: `4px solid ${
        activeMode !== 'nutrition' ? COLORS.greenAccent : COLORS.redAccent
      }`,
      position: 'fixed',
      width: '100%',
      zIndex: 4,
    },
  })),
)(AppBar);
