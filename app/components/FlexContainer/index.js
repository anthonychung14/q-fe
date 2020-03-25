import React from 'react';

const getJustify = ({ around, between, center }) => {
  if (around) return 'space-around';
  if (between) return 'space-between';

  return center ? 'center' : null;
};

const FlexContainer = ({ children, row, flex, style = {}, ...props }) => (
  <div
    style={{
      flex: flex || 1,
      display: 'flex',
      flexDirection: row ? 'row' : 'column',
      alignItems: props.center ? 'center' : null,
      width: props.center ? '100%' : 'inherit',
      justifyContent: getJustify(props),
      ...style,
    }}
  >
    {children}
  </div>
);

export const Flex = ({ children, flex = 1, row, between }) => (
  <div
    style={{
      flex,
      flexDirection: row ? 'row' : 'column',
      justifyContent: between && 'space-between',
    }}
  >
    {children}
  </div>
);

export default FlexContainer;
