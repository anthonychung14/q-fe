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
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { WingBlank } from 'antd-mobile';

import Container from 'components/Container';
import Login from 'components/Login';
import TrackIncidents from 'containers/TrackIncidents';

/* eslint-disable react/prefer-stateless-function */
const TrackPage = ({ auth, firebase }) => (
  <Container type="page" headerText="Track Incidents">
    <WingBlank size="lg">
      {isLoaded(auth) && isEmpty(auth) ? (
        <Login firebase={firebase} />
      ) : (
        <TrackIncidents />
      )}
    </WingBlank>
  </Container>
);

export default compose(
  firebaseConnect(),
  connect(state => ({ auth: state.get('firebase').auth })),
)(TrackPage);
