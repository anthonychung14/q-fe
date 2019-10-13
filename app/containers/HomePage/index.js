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
import { WingBlank, Steps, WhiteSpace } from 'antd-mobile';
import ViewHeader from 'components/ViewHeader';
// import Login from 'components/Login';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <WingBlank size="md">
        <ViewHeader header="What is Q?" />
        <WingBlank size="lg">
          <h2>Q automates practice</h2>
          <WhiteSpace />
          <Steps size="medium" current={0}>
            <Steps.Step title="Enter moves" />
            <Steps.Step title="Compose moves into sequences" />
            <Steps.Step title="Practice sequences in cycles" />
            <Steps.Step title="Profit" />
          </Steps>
        </WingBlank>
        <WhiteSpace />
      </WingBlank>
    );
  }
}
/* 
.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
*/
