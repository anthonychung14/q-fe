import _ from 'lodash';
import { compose, withHandlers } from 'recompose';
import { firebaseConnect } from 'react-redux-firebase';

import { connectAuth } from 'selectors/firebase';
import { currentTimeSeconds, getStorageDate } from 'utils/time';
import { mapKeysToSnake, withLoading, withSetGif } from 'utils/enhancers';
import { postResource, fetchGiphy } from 'utils/api';

const connectCreateResource = compose(
  withSetGif,
  withHandlers({
    createResource: ({
      firebase,
      form = 'incident',
      reportType,
      reset,
      setLoading,
      setGif,
    }) => async (resourceType, values) => {
      setLoading(true);
      const data = await fetchGiphy();

      setGif(data);
      const withGifVals = values
        .set('gif_url', data.image_url)
        .set('giphy_id', data.id);

      if (reportType === 'incident') {
        const storageDate = getStorageDate();
        await firebase.push(`${form}/${storageDate}`, values);
      } else {
        await postResource({ resourceType, values: withGifVals });
      }

      setLoading(false);

      if (reset) {
        reset();
      }
    },
  }),
);

const withSubmitResources = withHandlers({
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

    try {
      firebaseValues.forEach(({ producerId, ...fbValue }) => {
        firebase.push(form, {
          date_created_timestamp: time,
          date_created: String(getStorageDate()),
          ...fbValue,
        });
      });
    } catch (e) {
      console.log('e is', e);
    }

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
});

export const withOnSubmit = compose(
  firebaseConnect(),
  connectAuth,
  withLoading,
  withSubmitResources,
  connectCreateResource,
  // branch(
  //   props => props.reportType === 'incident',
  // ),
);
