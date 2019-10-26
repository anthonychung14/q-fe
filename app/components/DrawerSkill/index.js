import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Drawer, List } from 'antd-mobile';

const MODES = ['combat', 'nutrition', 'strength', 'knowledge'];

const sidebar = ({ makeHandlePress }) => (
  <List style={{ paddingTop: '42px' }}>
    {MODES.map(skill => (
      <TouchableOpacity key={`skill-${skill}`} onPress={makeHandlePress(skill)}>
        <List.Item>{skill.toUpperCase()}</List.Item>
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
        width: '80%',
      }}
      open={drawerOpen}
      onOpenChange={() => handleDrawerToggle(!drawerOpen)}
    >
      {children}
    </Drawer>
  );
};

export default connect()(DrawerSkill);
