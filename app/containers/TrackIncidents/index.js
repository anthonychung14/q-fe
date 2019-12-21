/*
 * Report Incident
 *
 *
*/
import _ from 'lodash';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'recompose';
import { Chart } from 'react-charts';
import { useFirebaseConnect } from 'react-redux-firebase';

// import { SegmentedControl } from 'antd-mobile';
import Container from 'components/Container';

import { connectActiveSegmentProps } from 'selectors/skill_mode';
import { withSegmentState } from 'utils/enhancers';
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

const convertToDataSet = _.flow([
  _.groupBy('value.type'),
  _.map((listValues, k) => ({
    label: k,
    data: makeDataFromList(listValues, k),
    color: INCIDENT_COLORS[k],
  })),
]);

const TrackIncidentComponent = ({
  activeForm,
  activeIndex,
  onChange,
  onValueChange,
  tintColor,
  values,
}) => {
  useFirebaseConnect([
    'incident', // { path: '/todos' } // object notation
  ]);

  const fbIncidents = useSelector(state => {
    return state.get('firebase').ordered.incident;
  });
  console.log(convertToDataSet(fbIncidents), '.....need a break');

  const data = React.useMemo(
    () => {
      if (fbIncidents) {
        return convertToDataSet(fbIncidents);
      }

      return [];
    },
    [fbIncidents],
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
    <Container>
      {/* <SegmentedControl
        activeForm={activeForm}
        onChange={onChange}
        onValueChange={onValueChange}
        selectedIndex={activeIndex}
        values={values}
        tintColor={tintColor}
      /> */}
      <Container padded style={{ height: '450px', width: '100%' }}>
        <Chart
          data={data}
          series={series}
          axes={axes}
          tooltip
          getSeriesStyle={s => ({ color: s.originalSeries.color })}
        />
      </Container>
    </Container>
  );
};

const Enhanced = compose(
  connectActiveSegmentProps,
  withSegmentState,
);

const TrackIncidents = Enhanced(TrackIncidentComponent);

export default TrackIncidents;
