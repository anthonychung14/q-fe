/**
 * Form field to select a resource
 *
 * @format
 * @flow
 */
import Fuse from 'fuse.js';

import * as React from 'react';
import {
  compose,
  withHandlers,
  withState,
  withProps,
  lifecycle,
  renderComponent,
  branch,
} from 'recompose';

import resources from 'resources';
import { WhiteSpace, WingBlank } from 'antd-mobile';

import { connectActiveMode } from 'selectors/skillMode';

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

const HEADERS = {
  headers: {
    Authorization: 'Bearer keyXl84W0rtRUuOEV', // SUPER SECRET KEY
  },
};

export const fetchAirtable = compose(
  connectActiveMode,
  withLoading,
  withState('records', 'setRecords', []),
  lifecycle({
    async componentDidMount() {
      const { setRecords, setLoading, resourceType } = this.props;
      const appId = 'appO4vBVgVx66KFPX';

      const { records } = await fetch(
        `https://api.airtable.com/v0/${appId}/${resourceType}?view=Grid%20view`,
        HEADERS,
      )
        .then(r => r.json())
        .catch(e => e);

      setRecords(new Fuse(records, options), () => {
        setLoading(false);
      });
    },
  }),
  withHandlers({
    fetchSuggestions: () => value => {
      // console.log(value, 'fetching suggestions for');
    },
  }),
);

const fetchGif = () =>
  fetch(
    'https://api.giphy.com/v1/gifs/random?api_key=5H93zHGj3Eg4pOv4BaV7oyJiO10O0r2X',
  )
    .then(r => r.json())
    .catch(e => {
      console.log(e, 'eeeee');
    });

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
      // get a random gif link from a giphy endpoint
      // create the thing
      const { data } = await fetchGif();
      const { image_url, id } = data;
      setGif(data);
      const withGifVals = values.set('gif_url', image_url).set('giphy_id', id);

      const results = await postResource({ resourceType, values: withGifVals });

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
