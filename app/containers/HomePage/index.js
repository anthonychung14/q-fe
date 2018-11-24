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
import { Flex, WhiteSpace, WingBlank } from 'antd-mobile';
import MealCard from 'components/CardList/MealCard';

const stubbedUrl =
  'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?diet=paleo&exclude=shellfish%2C+olives&targetCalories=2000&timeFrame=day';

const headers = new Headers({
  'Content-Type': 'application/json',
  'X-Mashape-Key': 'sk34fGomj4mshbOh7kFaN1UMU6wcp17ZEipjsnmnWMRRh1NlPf',
});

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  componentWillMount() {
    if (localStorage.getItem('recipe3')) {
      console.log(JSON.parse(localStorage.getItem('recipe')), 'stored');
    } else {
      fetch(stubbedUrl, {
        headers,
      })
        .then(res => res.json())
        .then(response => {
          console.log(response, 'received');
          localStorage.setItem('recipe3', JSON.stringify(response));
        })
        .catch(error => console.error('Error:', error));
    }
  }

  render() {
    return (
      <WingBlank size="md">
        <Flex wrap="wrap" justify="around">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i}>
              <WhiteSpace size="lg" />
              <MealCard key={i} />
              <WhiteSpace size="lg" />
            </div>
          ))}
        </Flex>
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
