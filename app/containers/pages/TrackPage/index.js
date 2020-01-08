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

import Container from 'components/Container';
import Button from 'components/Button';

import { NutritionTable } from 'containers/widgets';

// TODO: nutrition specific selectors must be moved into their own module
import { getNutritionConsumed } from 'selectors/firebase';
import {
  convertToUnixFromDate,
  currentTimeSeconds,
  formatUnixTimestamp,
  convertDateToPath,
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

const totalForMacroInDate = (date, consumedOnDate, macro) =>
  _.reduce(
    consumedOnDate,
    (acc, curr) => {
      const next = acc + _.get(curr, `grams_${macro}`);
      return next;
    },
    0,
  );

const getConsumedFromDate = (date, object) =>
  _.defaultTo(_.get(object, `2020.${convertDateToPath(date)}`), {});

export const getStoragePathFromItem = item =>
  convertDateToPath(
    formatUnixTimestamp(item.date_created_timestamp, 'storage_date'),
  );

const makeMacroSummaries = (date, object) => {
  // { 2020: { 1: { 04: { stuff, stuff, stuff } } } }

  const consumedOnDate = getConsumedFromDate(date, object);

  return ['protein', 'fat', 'carb'].map(m => ({
    x: m,
    y: totalForMacroInDate(date, consumedOnDate, m),
  }));
};

const makeDatesFromPastWeek = () =>
  new Array(7)
    .fill(0)
    .map((_, idx) =>
      formatUnixTimestamp(
        currentTimeSeconds() - (7 + idx * 24 * 60 * 60),
        'shorter_date',
      ),
    )
    .reduce((acc, date) => {
      acc[date] = [];
      return acc;
    }, {});

const makeMacrosForWeek = (object, m, dates) => {
  //

  // for each date, return a total where
  return _.keys(dates).map(date => {
    const consumedOnDate = getConsumedFromDate(date, object);
    return {
      x: date,
      y: totalForMacroInDate(date, consumedOnDate, m),
    };
  });
};

// splits data so that secondary axes is macros + histogram of dates
const makeDataByDay = object => {
  const dates = makeDatesFromPastWeek();
  return _.map(dates, (currArr, shorterDateKey) => ({
    label: shorterDateKey,
    datums: currArr.concat(makeMacroSummaries(shorterDateKey, object)),
  }));
};

// splits data so that secondary is dates, histogram of macros
const makeHistogramOfMacros = object => {
  const dates = makeDatesFromPastWeek();
  return ['protein', 'fat', 'carb'].map(m => ({
    label: m,
    datums: makeMacrosForWeek(object, m, dates),
  }));
};

const TrackPage = () => {
  const [isOn, toggleView] = React.useState(false);

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

  const userConsumeMap = useSelector(getNutritionConsumed);
  const data = React.useMemo(
    () =>
      isOn
        ? makeHistogramOfMacros(userConsumeMap)
        : makeDataByDay(userConsumeMap),
    [userConsumeMap, isOn],
  );

  return (
    <Container type="empty">
      <Container padded style={{ height: '300px', width: '100%' }}>
        <NutritionTable />

        {Object.keys(userConsumeMap).length > 0 ? (
          <Chart
            data={data}
            series={series}
            axes={axes}
            tooltip
            getSeriesStyle={s => ({ color: s.originalSeries.color })}
          />
        ) : null}
        <Container horizontal end>
          <Button
            handleClick={() => toggleView(!isOn)}
            width="25%"
            text={isOn ? 'Macro' : 'Week'}
            type={isOn ? 'secondary' : 'cancel'}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default TrackPage;
