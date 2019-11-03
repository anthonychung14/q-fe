import React from 'react';
import _ from 'lodash';
import { WhiteSpace } from 'antd-mobile';
import styled from 'styled-components';
// import styledN from 'styled-components/native';
import Avatar from 'react-avatar';

import { Text, View, TouchableOpacity } from 'react-native';

import COLORS from 'constants/colors';

const RowHeaderWrapper = styled.div`
  color: #888;
  font-size: 18px;
  border-bottom: 2px solid
    ${({ activeMode }) => _.get(COLORS, ['modes', activeMode, 'secondary'])};
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
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

const GridItem = props => {
  const {
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
        padding: '5px',
        margin: '5px',
        height: '100%',
        width: '100%',
        backgroundColor: numInCart
          ? COLORS.primaryLight
          : COLORS.secondaryWhite,
      }}
      key={cardId}
    >
      <TouchableOpacity onPress={handlePress}>
        <WhiteSpace size="md" />
        <RowHeaderWrapper>
          <Text
            style={{
              fontWeight: 'bold',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {cardTitle}
          </Text>
        </RowHeaderWrapper>
        <WhiteSpace size="lg" />
        <RowContentWrapper>
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={{ display: 'flex', marginBottom: '4px' }}>
              {description}
            </Text>
            <NumIndicator numInCart={numInCart} />

            <WhiteSpace size="md" />
            <RowFooterWrapper>
              <Text style={{ fontSize: '14px', color: COLORS.orangeAccent }}>
                {cardType}
              </Text>
            </RowFooterWrapper>
          </View>
          <WhiteSpace size="md" />
        </RowContentWrapper>
      </TouchableOpacity>
    </View>
  );
};

export default GridItem;
