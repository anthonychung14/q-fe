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

import AboutPage from 'containers/pages/AboutPage/Loadable';
import TrackPage from 'containers/pages/TrackPage/Loadable';
import ReportIncident from 'containers/ReportIncident/Loadable';
import { connectActiveMode } from 'selectors/skill_mode';

import Container from 'components/Container';
import Login from 'components/Login';

const MAP = {
  about: {
    headerText: 'About Centinel',
    Component: AboutPage,
  },
  track: {
    headerText: 'Track Incidents',
    Component: TrackPage,
  },
  report: {
    headerText: 'Report an Incident',
    Component: ReportIncident,
  },
};

const getProps = page => {
  return MAP[page] || MAP.report;
};

const PageDisplayer = ({ page }) => {
  const { headerText, Component } = getProps(page);

  return (
    <Container type="page" headerText={headerText}>
      <Component />
    </Container>
  );
};

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  render() {
    const { auth, firebase, activeMode } = this.props;
    return (
      <WingBlank size="lg">
        {isLoaded(auth) && isEmpty(auth) ? (
          <Login firebase={firebase} />
        ) : (
          <PageDisplayer page={activeMode} />
        )}
      </WingBlank>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect(state => ({ auth: state.get('firebase').auth })),
  connectActiveMode,
)(HomePage);
