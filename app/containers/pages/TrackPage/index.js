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
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase';
import { WingBlank } from 'antd-mobile';

import Container from 'components/Container';

import { formatUnixTimestamp, convertToUnixFromDate } from 'utils/time';

const INCIDENT_COLORS = {
  emergency: 'red',
  theft: 'yellow',
  intrusion: 'blue',
};

const makeDataFromList = list => {
  const numCounted = _.countBy(list, i =>
    formatUnixTimestamp(i.value.reported_seconds, 'x_axis'),
  );
  return _.map(numCounted, (v, k) => ({
    x: new Date(convertToUnixFromDate(k) * 1000),
    y: v,
  }));
};

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
  const firebase = useFirebase();
  useFirebaseConnect('incident');

  const incidents = useSelector(state => {
    return state.get('firebase').ordered.incident;
  });

  const data = React.useMemo(
    () => {
      if (incidents) {
        return _.map(_.groupBy(incidents, 'value.type'), (listValues, k) => ({
          label: k,
          data: makeDataFromList(listValues, k),
          color: INCIDENT_COLORS[k],
        }));
      }

      return [];
    },
    [incidents],
  );

  const series = React.useMemo(
    () => ({
      type: 'area',
    }),
    [],
  );

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: 'time',
        position: 'bottom',
      },
      { position: 'left', type: 'linear', stacked: true },
    ],
    [],
  );

  return (
    <WingBlank size="lg">
      <Container padded style={{ height: '450px', width: '100%' }}>
        <Chart
          data={data}
          series={series}
          axes={axes}
          tooltip
          getSeriesStyle={s => ({ color: s.originalSeries.color })}
        />
      </Container>
    </WingBlank>
  );
};

export default TrackPage;
