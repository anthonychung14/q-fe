/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { withState, compose } from 'recompose';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';

import NutritionPage from 'containers/pages/NutritionPage/loadable';
import TrackPage from 'containers/pages/TrackPage/loadable';
import AboutPage from 'containers/pages/AboutPage/loadable';
import AddCards from 'containers/AddCards/loadable';

import Login from 'components/Login';
import AppBar from 'components/AppBar';
import LeftDrawer from 'components/LeftDrawer';
import Container from 'components/Container';

import { connectActiveMode } from 'selectors/skill_mode';
import { getAuth } from 'selectors/firebase';

import GlobalStyle from '../../global-styles';

const withToggleOpenState = withState(
  'drawerOpen',
  'handleDrawerToggle',
  false,
);

const MAP = {
  about: {
    headerText: '',
    Component: AboutPage,
  },
  consume: {
    headerText: '',
    Component: NutritionPage,
  },
  acquire: {
    headerText: '',
    Component: AddCards,
  },
  track: {
    headerText: 'Progress Today',
    Component: TrackPage,
  },
};

const getProps = page => {
  return MAP[page] || MAP.consume;
};

const PageDisplayer = ({ activeMode, auth, firebase }) => {
  const { headerText, Component } = getProps(activeMode);

  return (
    <Container type="page" headerText={headerText}>
      {isLoaded(auth) && isEmpty(auth) ? (
        <Login firebase={firebase} />
      ) : (
        <Component />
      )}
    </Container>
  );
};

const PageContainer = compose(
  firebaseConnect(),
  connect(state => ({ auth: getAuth(state) })),
  connectActiveMode,
)(PageDisplayer);

const Body = drawerProps => (
  <div style={{ height: '100%', width: '100%' }}>
    <AppBar {...drawerProps} />
    <LeftDrawer {...drawerProps}>
      <PageContainer />
    </LeftDrawer>
    <GlobalStyle />
  </div>
);

const BodyWithDrawer = withToggleOpenState(Body);

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Provisor" defaultTitle="Provisor">
        <meta name="description" content="Automate Nutrition" />
      </Helmet>
      <BodyWithDrawer />
    </div>
  );
}
