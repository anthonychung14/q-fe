import React from 'react';
import { Picker, List, WhiteSpace } from 'antd-mobile';

/*
    PropTypes:
        - Should be an overarching form
        - Add the segment bar first
*/

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

const colorStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '16px',
  height: '16px',
  marginRight: '10px',
};

const colors = [
  {
    label: (
      <div>
        <span style={{ ...colorStyle, backgroundColor: '#FF0000' }} />
        <span>红色</span>
      </div>
    ),
    value: '#FF0000',
  },
  {
    label: (
      <div>
        <span style={{ ...colorStyle, backgroundColor: '#00FF00' }} />
        <span>绿色</span>
      </div>
    ),
    value: '#00FF00',
  },
  {
    label: (
      <div>
        <span style={{ ...colorStyle, backgroundColor: '#0000FF' }} />
        <span>蓝色</span>
      </div>
    ),
    value: '#0000FF',
  },
];

export default class SinglePicker extends React.Component {
  state = {
    data: [],
    cols: 1,
    pickerValue: [],
    asyncValue: [],
    sValue: ['2013', '春'],
    visible: false,
    colorValue: ['#00FF00'],
  };

  onClick = () => {
    setTimeout(() => {
      this.setState({
        data: provinceLite,
      });
    }, 120);
  };

  onPickerChange = val => {
    console.log(val);
    let colNum = 1;
    const d = [...this.state.data];
    const asyncValue = [...val];
    if (val[0] === 'zj') {
      d.forEach(i => {
        if (i.value === 'zj') {
          colNum = 2;
          if (!i.children) {
            i.children = [
              {
                value: 'zj-nb',
                label: '宁波',
              },
              {
                value: 'zj-hz',
                label: '杭州',
              },
            ];
            asyncValue.push('zj-nb');
          } else if (val[1] === 'zj-hz') {
            i.children.forEach(j => {
              if (j.value === 'zj-hz') {
                j.children = [
                  {
                    value: 'zj-hz-xh',
                    label: '西湖区',
                  },
                ];
                asyncValue.push('zj-hz-xh');
              }
            });
            colNum = 3;
          }
        }
      });
    } else {
      colNum = 1;
    }
    this.setState({
      data: d,
      cols: colNum,
      asyncValue,
    });
  };

  getSel() {
    const value = this.state.pickerValue;
    if (!value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(
      district,
      (c, level) => c.value === value[level],
    );
    return treeChildren.map(v => v.label).join(',');
  }
  // setVal() {
  //   this.props.form.setFieldsValue({
  //     district: ['340000', '340800', '340822'],
  //   });
  // },

  onChangeColor = color => {
    this.setState({
      colorValue: color,
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <WhiteSpace size="lg" />
        <List style={{ backgroundColor: 'white' }} className="picker-list">
          <Picker
            data={seasons}
            title="选择季节"
            cascade={false}
            value={this.state.sValue}
            onChange={v => this.setState({ sValue: v })}
            onOk={v => this.setState({ sValue: v })}
          >
            <List.Item arrow="horizontal">Multiple</List.Item>
          </Picker>
          <Picker
            data={district}
            cols={1}
            {...getFieldProps('district3')}
            className="forss"
          >
            <List.Item arrow="horizontal">Single</List.Item>
          </Picker>
          <Picker
            data={this.state.data}
            cols={this.state.cols}
            value={this.state.asyncValue}
            onPickerChange={this.onPickerChange}
            onOk={v => console.log(v)}
          >
            <List.Item arrow="horizontal" onClick={this.onClick}>
              Multiple & async
            </List.Item>
          </Picker>
          <Picker
            title="选择地区"
            data={district}
            value={this.state.pickerValue}
            onChange={v => this.setState({ pickerValue: v })}
            onOk={v => this.setState({ pickerValue: v })}
          >
            <CustomChildren>Customized children</CustomChildren>
          </Picker>
          <Picker
            visible={this.state.visible}
            data={district}
            value={this.state.pickerValue}
            onChange={v => this.setState({ pickerValue: v })}
            onOk={() => this.setState({ visible: false })}
            onDismiss={() => this.setState({ visible: false })}
          >
            <List.Item
              extra={this.getSel()}
              onClick={() => this.setState({ visible: true })}
            >
              Visible state
            </List.Item>
          </Picker>
          <Picker
            data={colors}
            value={this.state.colorValue}
            cols={1}
            onChange={this.onChangeColor}
          >
            <List.Item arrow="horizontal">Complex Labels</List.Item>
          </Picker>
        </List>
      </div>
    );
  }
}
