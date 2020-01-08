import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Drawer, List } from 'antd-mobile';

import { getActiveMode } from 'selectors/skill_mode';

const ROUTES = ['consume', 'track', 'acquire', 'about'];

const sidebar = ({ makeHandlePress }) => {
  const activeMode = useSelector(getActiveMode);
  return (
    <List style={{ paddingTop: '42px' }}>
      {ROUTES.map(route => (
        <TouchableOpacity
          key={`route-${route}`}
          onPress={makeHandlePress(route)}
        >
          <List.Item>{`${route.toUpperCase()} ${
            activeMode === route ? '**' : ''
          }`}</List.Item>
        </TouchableOpacity>
      ))}
    </List>
  );
};

const LeftDrawer = ({ drawerOpen, handleDrawerToggle, children }) => {
  const dispatch = useDispatch();

  const sidebarComponent = sidebar({
    makeHandlePress: mode => () => {
      dispatch({
        type: 'mode/SWITCH',
        payload: {
          mode,
        },
      });
    },
  });

  return (
    <Drawer
      className="my-drawer"
      style={{ minHeight: document.documentElement.clientHeight }}
      contentStyle={{}}
      sidebar={sidebarComponent}
      sidebarStyle={{
        border: '1px solid #ddd',
        background: 'white',
        width: '80%',
      }}
      open={drawerOpen}
      onOpenChange={() => handleDrawerToggle(!drawerOpen)}
    >
      {children}
    </Drawer>
  );
};

export default LeftDrawer;
