import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import styled from 'styled-components';
import Avatar from 'react-avatar';

import { View, TouchableOpacity } from 'react-native';
import COLORS from 'constants/colors';

const RowHeaderWrapper = styled.div`
  line-height: 50px;
  color: #888;
  font-size: 18px;
  border-bottom: 2px solid #f6f6f6;
  display: flex;
  justify-content: space-between;
`;

const RowContentWrapper = styled.div``;

const RowFooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ListRow = rowData => {
  const {
    avatarColor,
    avatarName,
    cardId,
    cardTitle,
    description,
    cardType,
    handlePress,
  } = rowData;
  return (
    <View style={{ padding: 10 }} key={cardId}>
      <TouchableOpacity onPress={handlePress}>
        <WhiteSpace size="md" />
        <RowHeaderWrapper>
          <Avatar
            color={avatarColor}
            name={avatarName}
            size={50}
            style={{ marginRight: '15px' }}
          />
          <div style={{ fontWeight: 'bold' }}>{cardTitle}</div>
        </RowHeaderWrapper>
        <WhiteSpace size="lg" />
        <RowContentWrapper>
          <div style={{ lineHeight: 1 }}>
            {description.split('.').map(d => (
              <div style={{ marginBottom: '4px' }}>{d}</div>
            ))}
            <WhiteSpace size="md" />
            <RowFooterWrapper>
              <span style={{ fontSize: '14px', color: COLORS.orangeAccent }}>
                {cardType}
              </span>
            </RowFooterWrapper>
          </div>
          <WhiteSpace size="md" />
        </RowContentWrapper>
      </TouchableOpacity>
    </View>
  );
};

export default ListRow;
