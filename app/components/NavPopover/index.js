import React from 'react';
import { Link } from 'react-router-dom';

import { Popover, Icon } from 'antd-mobile';

const myImg = src => (
  <img
    src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`}
    className="am-icon am-icon-xs"
    alt=""
  />
);

export default class NavPopover extends React.Component {
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
    return (
      <Popover
        overlayClassName="navPopoverOverlay"
        overlayStyle={{ color: 'currentColor' }}
        visible={this.state.visible}
        overlay={[
          <Popover.Item
            key="4"
            value="add"
            icon={myImg('tOtXhkIWzwotgGSeptou')}
            data-seed="logId"
          >
            <Link to="/add">Add</Link>
          </Popover.Item>,
          <Popover.Item
            key="5"
            value="view"
            icon={myImg('PKAgAqZWJVNwKsAJSmXd')}
            style={{ whiteSpace: 'nowrap' }}
          >
            <Link to="/view">View</Link>
          </Popover.Item>,
          <Popover.Item
            key="6"
            value="cycle"
            icon={myImg('uQIYTFeRrjPELImDRrPt')}
          >
            <Link to="/cycle">Cycle</Link>
          </Popover.Item>,
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
        >
          <Icon type="ellipsis" />
        </div>
      </Popover>
    );
  }
}
