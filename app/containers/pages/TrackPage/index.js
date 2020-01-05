/*
 * HomePage
 *
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
*/

import _ from 'lodash';
import React from 'react';
import { Chart } from 'react-charts';
import { useSelector } from 'react-redux';
import { compose, withProps } from 'recompose';
import { useFirebaseConnect } from 'react-redux-firebase';
import { WingBlank } from 'antd-mobile';

import Container from 'components/Container';

import { NutritionTable } from 'containers/widgets';
import { withOnSubmit } from 'containers/CreateResource/formEnhancers';

import { getGoalProps } from 'selectors/goals';
import { getNutritionConsumed } from 'selectors/firebase';
import {
  formatUnixTimestamp,
  convertToUnixFromDate,
  getDayFromDate,
  getToday,
} from 'utils/time';

const makeDataFromList = list => {
  const numCounted = _.countBy(list, i =>
    formatUnixTimestamp(i.value.reported_seconds, 'x_axis'),
  );
  return _.map(numCounted, (v, k) => ({
    x: new Date(convertToUnixFromDate(k) * 1000),
    y: v,
  }));
};

// maps over all items eaten. y would be macro
const makeDataByDay = object => {
  const today = getToday();
  // append 6 days behind it
  // key each of them with an []

  return _.reduce(object, (acc, curr) => {
    return;

    const date = getDayFromDate(curr.date_created_timestamp);
    acc[date] = acc[date] + 1 || 1;
    return acc;
  });
};

// (consumedByKeys, macro) => ({
//   label: macro,
//   datums: _.map(consumedByKeys, item => ({
//     // x: 'convertDateToDay'
//     x: getDayFromDate(_.get(item, 'date_created_timestamp')),
//     y: _.get(item, `grams_${macro}`, 10),
//   })),
// });

// const convertToDataSet = _.flow([
//   _.groupBy('value.type'),
//   _.map((listValues, k) => ({
//     label: k,
//     data: makeDataFromList(listValues, k),
//     color: INCIDENT_COLORS[k],
//   })),
// ]);

/* eslint-disable react/prefer-stateless-function */
const TrackPage = () => {
  const { date, googleUID } = useSelector(getGoalProps);
  const series = React.useMemo(
    () => ({
      type: 'bar',
    }),
    [],
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'left' },
      { position: 'bottom', type: 'linear', stacked: true },
    ],
    [],
  );

  useFirebaseConnect(`nutrition/consumed/${googleUID}/${date}`);
  const path = date.split('/').join('.');
  const consumed = useSelector(state => {
    const consumedTree = getNutritionConsumed(state);
    return _.get(consumedTree, `${googleUID}.${path}`, []);
  });

  // split today's date into this plus - 6 days
  return (
    <WingBlank size="lg">
      <Container padded style={{ height: '300px', width: '100%' }}>
        {Object.keys(consumed).length > 0 ? (
          <Chart
            data={[]}
            series={series}
            axes={axes}
            tooltip
            getSeriesStyle={s => ({ color: s.originalSeries.color })}
          />
        ) : null}
        <NutritionTable />
      </Container>
    </WingBlank>
  );
};

export default TrackPage;
