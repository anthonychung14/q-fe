import React from 'react';
import { branch, renderNothing } from 'recompose';
import { List } from 'antd-mobile';

import Button from './index';

const withNoHandleNoRender = branch(
  ({ handleClick }) => !handleClick,
  renderNothing,
);

const B = withNoHandleNoRender(Button);

const ButtonGroup = ({ handleUndo, handleLater, handleConfirm }) => (
  <List.Item>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        flex: 1,
      }}
    >
      <B
        type="cancel"
        handleClick={handleUndo}
        icon="cross-circle-o"
        width="30%"
      />
      <B type="outline" handleClick={handleLater} icon="down" width="30%" />
      <B
        type="primary"
        handleClick={handleConfirm}
        icon="check-circle"
        width="30%"
      />
    </div>
  </List.Item>
);

export default ButtonGroup;
