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
import { Text } from 'react-native';

import Container from 'components/Container';
import Subheader from 'components/Subheader';

const EMAIL = 'realtonychung@gmail.com';
/* eslint-disable react/prefer-stateless-function */
const AboutPage = () => (
  <Container style={{ justifyContent: 'space-around' }}>
    <Subheader
      text="Goal"
      renderText={() => (
        <Container
          paddedBottom
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <Container padded style={{ flexDirection: 'column' }}>
            <Text>
              Provisor makes it easy to track and add custom food as items and
              composite items. Over time, it will suggest foods that fit your
              preferences + macros
            </Text>
          </Container>
        </Container>
      )}
    />
    <Subheader
      secondary
      text="Contact"
      renderText={() => (
        <Container
          paddedBottom
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          <a href={`mailto:${EMAIL}`}>EMAIL</a>
          <a href={`tel:+19258187564`}>PHONE</a>
          <a href={`sms:+19258187564`}>SMS</a>
        </Container>
      )}
    />
  </Container>
);

export default AboutPage;
