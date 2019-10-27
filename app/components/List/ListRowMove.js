import React from 'react';
import { WhiteSpace, ActivityIndicator } from 'antd-mobile';
import styled from 'styled-components';
// import styledN from 'styled-components/native';
import Avatar from 'react-avatar';

import { Text, View, TouchableOpacity } from 'react-native';

import COLORS from 'constants/colors';

const RowHeaderWrapper = styled.div`
  line-height: 50px;
  color: #888;
  font-size: 18px;
  border-bottom: 2px solid #f6f6f6;
  display: flex;
  justify-content: space-between;
`;

const RowContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RowFooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const NumIndicator = ({ numInCart }) => {
  if (numInCart === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {numInCart} servings
    </div>
  );
};

const ListRow = props => {
  const {
    avatarColor,
    avatarName,
    cardId,
    cardTitle,
    description,
    cardType,
    handlePress,
    numInCart = 0,
  } = props;
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: numInCart ? COLORS.primaryLight : 'white',
      }}
      key={cardId}
    >
      <TouchableOpacity onPress={handlePress}>
        <WhiteSpace size="md" />
        <RowHeaderWrapper>
          <Avatar
            color={avatarColor}
            name={avatarName}
            size={50}
            style={{ marginRight: '15px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 'bold' }}>{cardTitle}</div>
          </div>
        </RowHeaderWrapper>
        <WhiteSpace size="lg" />
        <RowContentWrapper>
          <div style={{ lineHeight: 1, flexGrow: 1 }}>
            {description.split('.').map(d => (
              <div key={d} style={{ marginBottom: '4px' }}>
                {d}
              </div>
            ))}
            <NumIndicator numInCart={numInCart} />

            <WhiteSpace size="md" />
            <RowFooterWrapper>
              <Text style={{ fontSize: '14px', color: COLORS.orangeAccent }}>
                {cardType}
              </Text>
            </RowFooterWrapper>
          </div>
          <WhiteSpace size="md" />
        </RowContentWrapper>
      </TouchableOpacity>
    </View>
  );
};

export default ListRow;
