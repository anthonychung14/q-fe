import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Drawer, List } from 'antd-mobile';

const MODES = ['nutrition', 'knowledge', 'combat', 'love'];

const sidebar = ({ makeHandlePress }) => (
  <List style={{ paddingTop: '42px' }}>
    {MODES.map(skill => (
      <TouchableOpacity
        key={`skill-${skill}`}
        disabled={skill !== 'nutrition' && skill !== 'knowledge'}
        onPress={makeHandlePress(skill)}
      >
        <List.Item
          style={{
            backgroundColor:
              skill !== 'nutrition' && skill !== 'knowledge' ? 'silver' : '',
          }}
        >
          {skill.toUpperCase()}
        </List.Item>
      </TouchableOpacity>
    ))}
  </List>
);

const DrawerSkill = ({
  drawerOpen,
  dispatch,
  handleDrawerToggle,
  children,
}) => {
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
        width: '60%',
      }}
      open={drawerOpen}
      onOpenChange={() => handleDrawerToggle(!drawerOpen)}
    >
      {children}
    </Drawer>
  );
};

export default connect()(DrawerSkill);
