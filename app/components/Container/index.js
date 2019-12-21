import React from 'react';
import { View } from 'react-native';

import ViewHeader from 'components/ViewHeader';

const Container = ({ children, style = {}, ...props }) => {
  const renderType = type =>
    type === 'page' ? <ViewHeader header={props.headerText} /> : null;

  return (
    <View
      {...props}
      style={{
        display: 'flex',
        paddingHorizontal: props.padded ? '4%' : null,
        paddingBottom: props.paddedBottom ? '4%' : null,
        ...style,
      }}
    >
      {renderType(props.type)}
      {children}
    </View>
  );
};

export default Container;
