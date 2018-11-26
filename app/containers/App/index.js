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

import HomePage from 'containers/HomePage/Loadable';
import AddCards from 'containers/AddCards/Loadable';
import ViewCards from 'containers/ViewCards/Loadable';
import CycleCards from 'containers/CycleCards/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AppBar from 'components/AppBar';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Q" defaultTitle="Q">
        <meta name="description" content="V2 of Q" />
      </Helmet>
      <AppBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/view" component={ViewCards} />
        <Route exact path="/add" component={AddCards} />
        <Route exact path="/cycle" component={CycleCards} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
