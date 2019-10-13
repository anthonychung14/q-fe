import { compose, withState, withHandlers } from 'recompose';

export const withOnSubmit = compose(
  withState('loading', 'setLoading', false),
  withHandlers({
    onSubmit: ({ firebase, reset, setLoading, form }) => values => {
      setLoading(true);
      setTimeout(() => {
        firebase
          .push(form, values)
          .then(result => {
            setLoading(false);
            reset();
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
      }, 400);
    },
    onMultiSubmit: ({ firebase, reset, form, setLoading }) => values => {
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
          .then(completeUpdates => {
            // console.log('DONE DONE DONE');
            setLoading(false);
            reset();
          });
      });
    },
  }),
);

// movesequence
