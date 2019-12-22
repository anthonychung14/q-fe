import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TouchableOpacity } from 'react-native';
import { Drawer, List } from 'antd-mobile';

const ROUTES = ['About', 'Report', 'Track'];

const sidebar = props => (
  <List style={{ paddingTop: '42px' }}>
    {ROUTES.map(route => (
      <Link key={`route-${route}`} to={`/${route.toLowerCase()}`}>
        <TouchableOpacity>
          <List.Item>{route.toUpperCase()}</List.Item>
        </TouchableOpacity>
      </Link>
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
