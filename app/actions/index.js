import _ from 'lodash';

import resources from '../resources';

const resourceActions = {};
_.each(resources, resource => {
  resourceActions[resource.type] = resource.actions;
});

const actions = Object.freeze({
  moves: {
    fetch: {
      START: 'moves/fetch/START',
      SUCCESS: 'moves/fetch/SUCCESS',
    },
  },
});

export default {
  ...actions,
  excerpt: {
    create: (values, type) => ({
      type: `CREATE_${_.upperCase(type)}_REQUEST`,
      payload: {
        resourceName: type,
        values: values.toJS(),
      },
    }),
  },
  textSource: {
    create: (values, type) => ({
      type: `CREATE_${_.upperCase(_.snakeCase(type))}_REQUEST`,
      payload: {
        resourceName: type,
        values: values.toJS(),
      },
    }),
  },
};
