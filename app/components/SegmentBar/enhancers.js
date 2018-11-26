import { compose, withHandlers, withState } from 'recompose';

export const withSegmentState = compose(
  withState('activeIndex', 'updateIndex', 0),
  withHandlers({
    // onValueChange: ({ updateIndex }) => value => {
    //   updateIndex(value)
    // },
    handleSegmentChange: ({ updateIndex }) => e => {
      updateIndex(e.nativeEvent.selectedSegmentIndex);
    },
  }),
);
