import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Drawer, List } from 'antd-mobile';

const ROUTES = ['Report', 'Track', 'About'];

const sidebar = ({ makeHandlePress }) => (
  <List style={{ paddingTop: '42px' }}>
    {ROUTES.map(route => (
      <TouchableOpacity key={`route-${route}`} onPress={makeHandlePress(route)}>
        <List.Item>{route.toUpperCase()}</List.Item>
      </TouchableOpacity>
    ))}
  </List>
);

const LeftDrawer = ({ drawerOpen, dispatch, handleDrawerToggle, children }) => {
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

export default connect()(LeftDrawer);
