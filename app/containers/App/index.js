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
