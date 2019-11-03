/**
 * Form field to select a resource
 *
 * @format
 * @flow
 */
import Fuse from 'fuse.js';

import * as React from 'react';
import _ from 'lodash';
import {
  compose,
  withHandlers,
  withState,
  withProps,
  lifecycle,
  renderComponent,
  branch,
} from 'recompose';

import { WhiteSpace, WingBlank } from 'antd-mobile';
import resources from 'resources';
import { fetchAirtableApi, fetchGiphy } from 'utils/api';

// TODO: changes as a function of the resource
const options = {
  keys: [
    'fields.name',
    'fields.title',
    'fields.subtitle',
    'fields.ingredient',
    'field.unit',
  ],
};

const withLoading = withState('loading', 'setLoading', false);

export const fetchAirtable = compose(
  withLoading,
  withState('records', 'setRecords', { options: {}, list: [] }),
  lifecycle({
    async componentDidMount() {
      const { setRecords, setLoading, search, resourceType } = this.props;

      const records = await fetchAirtableApi(resourceType, search);

      setRecords(new Fuse(_.reverse(records), options), () => {
        setLoading(false);
      });
    },
    async componentDidUpdate(prev) {
      const { setRecords, setLoading, search, resourceType } = this.props;

      if (search !== prev.search) {
        const records = await fetchAirtableApi(resourceType, search);

        setRecords(new Fuse(_.reverse(records), options), () => {
          setLoading(false);
        });
      }
    },
  }),
  withHandlers({
    fetchSuggestions: () => value => {
      // console.log(value, 'fetching suggestions for');
    },
  }),
);

const postResource = async ({ resourceType, values }) =>
  resources.airtable(resourceType).create([
    {
      fields: values.toJS(),
    },
  ]);

const withSetGif = compose(withState('gif', 'setGif', {}));

export const withCreateResource = compose(
  withLoading,
  withSetGif,
  withHandlers({
    createResource: ({ setLoading, setGif }) => async (
      resourceType,
      values,
    ) => {
      setLoading(true);
      const data = await fetchGiphy();

      setGif(data);
      const withGifVals = values
        .set('gif_url', data.image_url)
        .set('giphy_id', data.id);

      await postResource({ resourceType, values: withGifVals });
      setLoading(false);
    },
  }),
  withProps(({ loading, gif }) => ({ processing: Boolean(loading && gif) })),
  // if you're processing, render a GIF instead of the form
  // processing no longer true...so...
  branch(
    props => props.processing,
    renderComponent(() => (
      <WingBlank size="md">
        <WhiteSpace size="md" />
        <h4>PROCESSING</h4>
      </WingBlank>
    )),
  ),
);
