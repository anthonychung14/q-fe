import React from 'react';

const ROW = {
  display: 'flex',
  flex: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  border: '1px black solid',
};

export const Row = ({ children, style, onClick }) => (
  <div style={{ ...ROW, ...style }} onClick={onClick}>
    {children}
  </div>
);

export const FlexOne = ({ children }) => (
  <div style={{ flex: 1 }}>{children}</div>
);
