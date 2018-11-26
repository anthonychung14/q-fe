import { withHandlers } from 'recompose';

export const withOnSubmit = withHandlers({
  onSubmit: ({ firebase, reset, form }) => values => {
    // set state as loading
    firebase.push(form, values).then(result => {
      // set state as complete
      reset();
    });
  },
});
