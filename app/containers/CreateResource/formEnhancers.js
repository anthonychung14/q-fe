import _ from 'lodash';
import { compose, withState, withHandlers } from 'recompose';

import { currentTimeSeconds } from 'utils/time';
import { mapKeysToSnake } from 'utils/enhancers';

export const withOnSubmit = compose(
  withState('loading', 'setLoading', false),
  withHandlers({
    onSubmit: ({ firebase, reset, setLoading, form }) => values => {
      setLoading(true);
      setTimeout(() => {
        firebase
          .push(form, values)
          .then(() => {
            setLoading(false);
            reset();
          })
          .catch(() => {
            // console.error(err);
            setLoading(false);
          });
      }, 400);
    },
    onBulkSubmit: ({ dispatch, firebase, form, setLoading }) => values => {
      setLoading(true);
      const time = currentTimeSeconds();
      const firebaseValues = values
        .map(
          ({
            producerId,
            cardId,
            gramsCarb,
            gramsFat,
            gramsProtein,
            caloriesAtwater,
            ingredient,
          }) => ({
            dateCreatedTimestamp: time,
            foodItemId: cardId,
            producerId: _.first(producerId),
            gramsCarb,
            gramsFat,
            gramsProtein,
            caloriesAtwater,
            ingredient,
          }),
        )
        .map(mapKeysToSnake);

      firebaseValues.forEach(({ producer_id, ...fbValue }) => {
        firebase.push(form, { date_created_timestamp: time, ...fbValue });
      });

      setLoading(false);
      dispatch({
        type: 'card/EMPTY_RECENT_CART',
      });
    },
    onSequenceSubmit: ({ firebase, reset, form, setLoading }) => values => {
      setLoading(true);
      const { sequencemoves, ...sequencevalues } = values;

      firebase.push(form, sequencevalues).then(result => {
        const { key: sequenceId } = result;
        const styleId = values.sequencestyle;
        const moveUpdates = values.sequencemoves
          .map(i => i.value)
          .reduce((acc, moveId) => {
            const combatSequencePath = `combatSequence/${sequenceId}/moves/${moveId}`;
            const moveSequencePath = `combatMove/${moveId}/sequences/${sequenceId}`;
            acc[combatSequencePath] = true;
            acc[moveSequencePath] = true;
            return acc;
          }, {});

        const allUpdates = {
          ...moveUpdates,
          [`combatSequence/${sequenceId}/style/${styleId}`]: true,
          [`combatStyles/${styleId}/sequences/${sequenceId}`]: true,
        };

        // Update to both nodes simultaneously (fanout)
        firebase
          .ref()
          .update(allUpdates)
          .then(() => {
            // console.log('DONE DONE DONE');
            setLoading(false);
            reset();
          });
      });
    },
  }),
);
