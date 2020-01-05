import _ from 'lodash';
import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { NavLink } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';

import SearchButton from 'components/Button/SearchButton';
import NavPopover from 'components/NavPopover';

import COLORS from 'constants/colors';
import { getActiveMode } from 'selectors/skill_mode';

const AppBar = ({
  activeMode,
  navBarStyle,
  handleDrawerToggle,
  drawerOpen,
}) => (
  <NavBar
    style={navBarStyle}
    mode="dark"
    icon={<Icon type={drawerOpen ? 'left' : 'right'} />}
    onLeftClick={() => handleDrawerToggle(!drawerOpen)}
    rightContent={[
      activeMode === 'consume' ? (
        <SearchButton key="Search" />
      ) : (
        <NavPopover key="Outside" />
      ),
    ]}
  >
    <NavLink style={{ color: 'white' }} exact key="home" to="/">
      Provisor 0-1
    </NavLink>
  </NavBar>
);

export default compose(
  connect(state => ({ activeMode: getActiveMode(state) })),
  withProps(({ activeMode }) => ({
    navBarStyle: {
      backgroundColor: _.get(COLORS, [
        'modes',
        _.has(COLORS, ['modes', activeMode]) ? activeMode : 'consume',
        'primary',
      ]),
      borderBottom: `4px solid ${_.get(COLORS, [
        'modes',
        activeMode,
        'secondary',
      ])}`,
      position: 'fixed',
      width: '100%',
      zIndex: 4,
    },
  })),
)(AppBar);
