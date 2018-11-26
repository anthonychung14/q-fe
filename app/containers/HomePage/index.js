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
import { Flex, WingBlank } from 'antd-mobile';

import ViewHeader from 'components/ViewHeader';
// import Login from 'components/Login';

// const stubbedUrl =
//   'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?diet=paleo&exclude=shellfish%2C+olives&targetCalories=2000&timeFrame=day';

// const headers = new Headers({
//   'Content-Type': 'application/json',
//   'X-Mashape-Key': 'sk34fGomj4mshbOh7kFaN1UMU6wcp17ZEipjsnmnWMRRh1NlPf',
// });

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <WingBlank size="md">
        <ViewHeader header="Landing" />
        <Flex wrap="wrap" justify="around" />
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
