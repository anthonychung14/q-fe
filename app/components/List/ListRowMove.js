import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import styled from 'styled-components';
import Avatar from 'react-avatar';

import COLORS from 'constants/colors';

const RowHeaderWrapper = styled.div`
  line-height: 50px;
  color: #888;
  font-size: 18px;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  justify-content: space-between;
`;

const RowContentWrapper = styled.div`
  display: 'flex';
  padding: '15px 0';
`;

const getColor = type => COLORS.movetype[type];

const ListRow = (rowData, sectionID, rowID) => {
  const { movename, shorthand, description, movetype } = rowData;
  return (
    <div key={rowID} style={{ padding: '0 15px' }}>
      <WhiteSpace size="md" />
      <RowHeaderWrapper>
        <Avatar
          color={getColor(movetype)}
          name={shorthand}
          size={50}
          style={{ marginRight: '15px' }}
        />
        <div style={{ fontWeight: 'bold' }}>{movename}</div>
      </RowHeaderWrapper>
      <WhiteSpace size="lg" />
      <RowContentWrapper>
        <div style={{ lineHeight: 1 }}>
          {description.split('.').map(d => (
            <div style={{ marginBottom: '4px' }}>{d}</div>
          ))}
          <WhiteSpace size="md" />
          <div>
            <span style={{ fontSize: '14px', color: COLORS.orangeAccent }}>
              {movetype}
            </span>
          </div>
        </div>
        <WhiteSpace size="md" />
      </RowContentWrapper>
    </div>
  );
};

export default ListRow;
