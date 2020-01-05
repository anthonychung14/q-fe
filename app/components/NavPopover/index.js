import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';

import { TouchableOpacity } from 'react-native';
import { Popover, Icon } from 'antd-mobile';

const myImg = src => (
  <img
    src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`}
    className="am-icon am-icon-xs"
    alt=""
  />
);

class NavPopover extends React.Component {
  state = {
    visible: false,
    selected: '',
  };

  onSelect = opt => {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };

  handleVisibleChange = visible => {
    this.setState({
      visible,
    });
  };

  render() {
    const { firebase } = this.props;

    return (
      <Popover
        overlayClassName="navPopoverOverlay"
        overlayStyle={{ color: 'currentColor' }}
        visible={this.state.visible}
        overlay={[
          <TouchableOpacity key="1" onPress={() => firebase.logout()}>
            <Popover.Item key="1" value="view" style={{ whiteSpace: 'nowrap' }}>
              <h4>Logout</h4>
            </Popover.Item>
          </TouchableOpacity>,
          <TouchableOpacity key="5" onPress={() => console.log('do thing')}>
            <Popover.Item
              value="view"
              key="5"
              // icon={myImg('PKAgAqZWJVNwKsAJSmXd')}
              style={{ whiteSpace: 'nowrap' }}
            >
              <h4>Donate</h4>
            </Popover.Item>
          </TouchableOpacity>,
        ]}
        align={{
          overflow: { adjustY: 0, adjustX: 0 },
          offset: [-10, 0],
        }}
        onVisibleChange={this.handleVisibleChange}
        onSelect={this.onSelect}
      >
        <div
          style={{
            height: '100%',
            padding: '0 15px',
            marginRight: '-15px',
            display: 'flex',
            alignItems: 'center',
          }}
          key="first"
        >
          <Icon type="ellipsis" />
        </div>
      </Popover>
    );
  }
}

export default firebaseConnect()(NavPopover);
