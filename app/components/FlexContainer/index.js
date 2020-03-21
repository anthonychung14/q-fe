import React from 'react';
const FlexContainer = ({ children, row, ...props }) => (
  <div
    style={{ flex: 1, display: 'flex', flexDirection: row ? 'row' : 'column' }}
  >
    {children}
  </div>
);

export default FlexContainer;
