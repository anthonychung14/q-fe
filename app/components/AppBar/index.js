import React from 'react';
import { NavLink } from 'react-router-dom';

import { NavBar } from 'antd-mobile';
import NavPopover from 'components/NavPopover';

import COLORS from 'constants/colors';

// import CustomIcon from 'components/CustomIcon';
// import BarSvg from 'svgs/menu-icon.svg';

// const MenuDrawer = () => (
//   <div>
//     <CustomIcon size="lg" type={BarSvg} style={{ color: 'white' }} />
//   </div>
// );

const AppBar = () => (
  <NavBar
    style={{
      backgroundColor: COLORS.primaryDark,
      borderBottom: `4px solid ${COLORS.accentGreen}`,
      position: 'fixed',
      width: '100%',
      zIndex: 4,
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
