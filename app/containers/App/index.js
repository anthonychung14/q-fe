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

// import HomePage from 'containers/HomePage/Loadable';
import AddCards from 'containers/AddCards/Loadable';
import ViewCards from 'containers/ViewCards/Loadable';
import CycleCards from 'containers/CycleCards/Loadable';

import AppBar from 'components/AppBar';
import DrawerSkill from 'components/DrawerSkill';

import GlobalStyle from '../../global-styles';

const withToggleOpenState = withState(
  'drawerOpen',
  'handleDrawerToggle',
  false,
);

const Body = drawerProps => (
  <div style={{ height: '100%', width: '100%' }}>
    <AppBar {...drawerProps} />
    <DrawerSkill {...drawerProps}>
      <Switch>
        <Route exact path="/" component={ViewCards} />
        <Route exact path="/view" component={ViewCards} />
        <Route exact path="/add" component={AddCards} />
        <Route exact path="/cycle" component={CycleCards} />
      </Switch>
    </DrawerSkill>
    <GlobalStyle />
  </div>
);

const BodyWithDrawer = withToggleOpenState(Body);

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Q" defaultTitle="Q">
        <meta name="description" content="V2 of Q" />
      </Helmet>
      <BodyWithDrawer />
    </div>
  );
}
