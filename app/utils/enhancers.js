import _ from 'lodash';
import { branch, compose, withState, withHandlers } from 'recompose';

type Condition = [Function, Function];
export const condSwitch = (...conditions: Array<Condition>) =>
  compose(
    ...conditions.map(([ifPredicate, thenDo]) => branch(ifPredicate, thenDo)),
  );

export const withLoading = withState('loading', 'setLoading', false);
export const withSetGif = compose(withState('gif', 'setGif', {}));

export const withSegmentState = compose(
  withState('activeForm', 'onValueChange', props => _.first(props.values)),
  withState('activeIndex', 'onIndexChange', 0),
  withHandlers({
    onChange: ({ onIndexChange }) => e => {
      onIndexChange(e.nativeEvent.selectedSegmentIndex);
    },
  }),
);

export const mapObjKeysToCamel = (obj: Object) =>
  _.mapKeys(obj, (val, key) => _.camelCase(key));

export const mapKeysToSnake = (obj: Object) =>
  _.mapKeys(obj, (val, key) => _.snakeCase(key));
