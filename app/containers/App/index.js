/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { withState } from 'recompose';

import HomePage from 'containers/pages/HomePage/Loadable';
import AboutPage from 'containers/pages/AboutPage/Loadable';
import TrackPage from 'containers/pages/TrackPage/Loadable';
// import ReportPage from 'containers/ReportPage/Loadable';

import AppBar from 'components/AppBar';
import LeftDrawer from 'components/LeftDrawer';

import GlobalStyle from '../../global-styles';

const withToggleOpenState = withState(
  'drawerOpen',
  'handleDrawerToggle',
  false,
);

const Body = drawerProps => (
  <div style={{ height: '100%', width: '100%' }}>
    <AppBar {...drawerProps} />
    <LeftDrawer {...drawerProps}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/report" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/track" component={TrackPage} />
      </Switch>
    </LeftDrawer>
    <GlobalStyle />
  </div>
);

const BodyWithDrawer = withToggleOpenState(Body);

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Centinel" defaultTitle="Centinel">
        <meta name="description" content="Property Security" />
      </Helmet>
      <BodyWithDrawer />
    </div>
  );
}
