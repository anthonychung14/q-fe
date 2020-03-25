import React from 'react';
import { View } from 'react-native';

import ViewHeader from 'components/ViewHeader';

const Container = ({
  children,
  around,
  horizontal,
  end,
  type,
  style = {},
  ...props
}) => {
  const renderType = type =>
    type === 'page' && props.headerText ? (
      <ViewHeader header={props.headerText} />
    ) : null;

  let justifyContent = end ? 'flex-end' : 'flex-start';
  justifyContent = around ? 'space-around' : justifyContent;
  const mergedStyles = {
    display: 'flex',
    flexDirection: horizontal ? 'row' : 'column',
    justifyContent,
    paddingTop: props.type === 'mode' ? '42px' : null,
    paddingHorizontal: props.padded ? '2%' : null,
    paddingBottom: props.paddedBottom ? '2%' : null,
    flex: type === 'page' ? 1 : null,
    height: type === 'page' ? '100%' : null,
    ...style,
  };

  if (props.type === 'empty') {
    return <View style={mergedStyles}>{children}</View>;
  }

  return (
    <View {...props} style={mergedStyles}>
      {renderType(props.type)}
      {children}
    </View>
  );
};

export default Container;
