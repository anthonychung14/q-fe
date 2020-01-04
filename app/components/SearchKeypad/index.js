import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Grid } from 'antd-mobile';

/* eslint-disable react/prefer-stateless-function */
class SearchKeypad extends React.Component {
  makeHandleLetterPress = letter => () => {
    this.props.handleFilterClick(letter);
  };

  renderLetterKey = letter => (
    <TouchableOpacity onPress={this.makeHandleLetterPress(letter)}>
      <Text>
        {letter === 'CLEAR' ? (
          <span role="img" aria-label="no-good">
            🙅
          </span>
        ) : (
          letter
        )}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const { nextLetters } = this.props;

    return (
      <Grid
        data={nextLetters}
        columnNum={8}
        renderItem={this.renderLetterKey}
      />
    );
  }
}

export default SearchKeypad;
