import React from 'react';
import { View } from 'react-native';

import ViewHeader from 'components/ViewHeader';

const Container = ({ children, horizontal, end, style = {}, ...props }) => {
  const renderType = type =>
    type === 'page' && props.headerText ? (
      <ViewHeader header={props.headerText} />
    ) : null;

  const mergedStyles = {
    display: 'flex',
    flexDirection: horizontal ? 'row' : 'column',
    justifyContent: end ? 'flex-end' : 'flex-start',
    paddingTop: props.type === 'mode' ? '42px' : null,
    paddingHorizontal: props.padded ? '4%' : null,
    paddingBottom: props.paddedBottom ? '4%' : null,
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
