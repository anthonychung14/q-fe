/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
*/

import React from 'react';

import Container from 'components/Container';
import Subheader from 'components/Subheader';

/* eslint-disable react/prefer-stateless-function */
class AboutPage extends React.PureComponent {
  render() {
    return (
      <Container type="page" headerText="About Centinel">
        <Subheader text="Hello" />
      </Container>
    );
  }
}

export default AboutPage;
