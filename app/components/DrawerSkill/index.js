import React from 'react';
import { Drawer, List } from 'antd-mobile';

const SKILLS = ['combat', 'nutrition', 'strength', 'knowledge'];

const sidebar = (
  <List style={{ paddingTop: '42px' }}>
    {SKILLS.map(i => (
      <List.Item
        key={`skill-${i}`}
        thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
      >
        {i.toUpperCase()}
      </List.Item>
    ))}
  </List>
);

const DrawerSkill = ({ drawerOpen, handleDrawerToggle, children }) => (
  <Drawer
    className="my-drawer"
    style={{ minHeight: document.documentElement.clientHeight }}
    contentStyle={{}}
    sidebar={sidebar}
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

export default DrawerSkill;
