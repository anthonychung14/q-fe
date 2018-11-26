import React from 'react';

const Separator = (sectionID, rowID) => (
  <div
    key={`${sectionID}-${rowID}`}
    style={{
      backgroundColor: '#F5F5F9',
      height: 8,
      borderTop: '1px solid #ECECED',
      borderBottom: '1px solid #ECECED',
    }}
  />
);
export default Separator;
