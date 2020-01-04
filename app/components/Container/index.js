import React from 'react';
import { View } from 'react-native';

import ViewHeader from 'components/ViewHeader';

const Container = ({ children, style = {}, ...props }) => {
  const renderType = type =>
    type === 'page' && props.headerText ? (
      <ViewHeader header={props.headerText} />
    ) : null;

  if (props.type === 'empty') {
    return <View>{children}</View>;
  }

  const mergedStyles = {
    display: 'flex',
    paddingTop: props.type === 'mode' ? '42px' : null,
    paddingHorizontal: props.padded ? '4%' : null,
    paddingBottom: props.paddedBottom ? '4%' : null,
    ...style,
  };

  return (
    <View {...props} style={mergedStyles}>
      {renderType(props.type)}
      {children}
    </View>
  );
};

export default Container;
