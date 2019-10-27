import React from 'react';
import { Modal, List } from 'antd-mobile';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import Button from 'components/Button';
import { connectGoals } from 'selectors/goals';
import { formatUnixTimestamp, currentTimeSeconds } from 'utils/time';

const Column = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start
  flex-direction: column;
  justify-content: ${({ justify }) => {
    switch (justify) {
      case 'end':
        return 'flex-end';
      case 'center':
        return 'center';
      default:
        return 'flex-start';
    }
  }};
`;

const HeaderColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${({ start }) => (start ? 'flex-start' : 'flex-end')};
  align-items: ${({ start }) => (start ? 'flex-start' : 'flex-end')};
`;

const Total = ({ activeGoal }) => (
  <Text>
    {activeGoal.reduce((acc, curr, k) => {
      const multiplier = k === 'fat' ? 9 : 4;
      const final = acc + curr * multiplier;
      return final;
    }, 0)}{' '}
    cal
  </Text>
);

class SlideUpModal extends React.Component {
  confirmAdd = () => {
    // will have to write this to firebase...
    this.props.closeModal();
  };

  handleUndo = () => {
    this.props.dispatch({
      type: 'card/EMPTY_RECENT_CART',
    });
    this.props.closeModal();
  };

  render() {
    const {
      activeMode,
      closeModal,
      activeGoal,
      visible,
      maskClosable,
    } = this.props;
    return (
      <Modal
        popup
        transparent
        visible={visible}
        onClose={closeModal}
        animationType="slide-up"
        maskClosable={maskClosable}
      >
        <List
          renderHeader={() => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <HeaderColumn start>
                <div>
                  {`${formatUnixTimestamp(currentTimeSeconds(), 'short_date')}`}{' '}
                </div>
                <div>{activeMode}</div>
              </HeaderColumn>
              <HeaderColumn>
                <Text>consumed</Text>
              </HeaderColumn>
              <HeaderColumn>
                <Text>remaining</Text>
              </HeaderColumn>
              <HeaderColumn>
                <Text>daily goal</Text>
              </HeaderColumn>
            </View>
          )}
          className="popup-list"
        >
          <View
            style={{
              display: 'flex',
            }}
          >
            {['protein', 'fat', 'carb', 'calories'].map(i => (
              // This will eventually be your x req - this

              <List.Item key={`${i}-`}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Column>
                    <Text>{i}</Text>
                  </Column>
                  <Column justify="end">
                    <Text>120 g</Text>
                  </Column>
                  <Column justify="end">
                    <Text>10 g</Text>
                  </Column>

                  <Column justify="end">
                    {i === 'calories' ? (
                      <Total activeGoal={activeGoal} />
                    ) : (
                      <Text>{activeGoal.get(i)} g</Text>
                    )}
                  </Column>
                </View>
              </List.Item>
            ))}
          </View>

          <List.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flex: 1,
              }}
            >
              <Button
                type="secondary"
                handleClick={this.handleUndo}
                text="Undo"
                icon="cross-circle-o"
                width="45%"
              />
              <Button
                type="primary"
                handleClick={this.confirmAdd}
                text="Confirm"
                icon="check-circle"
                width="45%"
              />
            </div>
          </List.Item>
        </List>
      </Modal>
    );
  }
}

export default connectGoals(SlideUpModal);
