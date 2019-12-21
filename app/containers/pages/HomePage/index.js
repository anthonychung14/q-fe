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
import ReportIncident from 'containers/ReportIncident';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  render() {
    const { auth, firebase } = this.props;
    return (
      <Container type="page" headerText="Report an incident">
        <WingBlank size="lg">
          {isLoaded(auth) && isEmpty(auth) ? (
            <Login firebase={firebase} />
          ) : (
            <ReportIncident />
          )}
        </WingBlank>
      </Container>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect(state => ({ auth: state.get('firebase').auth })),
)(HomePage);
