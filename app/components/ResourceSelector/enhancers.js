/**
 * Form field to select a resource
 *
 * @format
 * @flow
 */

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

const withLoading = withState('loading', 'setLoading', false);

const HEADERS = {
  headers: {
    Authorization: 'Bearer keyXl84W0rtRUuOEV',
  },
};

export const fetchAirtable = compose(
  withLoading,
  withState('records', 'setRecords', []),
  lifecycle({
    async componentDidMount() {
      const { setRecords, setLoading, resourceType } = this.props;

      const { records } = await fetch(
        `https://api.airtable.com/v0/appO4vBVgVx66KFPX/${resourceType}?view=Grid%20view`,
        HEADERS,
      )
        .then(r => r.json())
        .catch(e => e);

      setRecords(records, () => {
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

const postResource = async ({ resourceType, values }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer keyXl84W0rtRUuOEV',
  };

  const body = await JSON.stringify({ fields: values.toJS() });

  console.log(resources, '???');

  return resources.airtable(resourceType).create([
    {
      fields: values.toJS(),
    },
  ]);

  // return fetch(
  //   `https://api.airtable.com/v0/appO4vBVgVx66KFPX/${resourceType}`,
  //   {
  //     headers,
  //     method: 'POST',
  //     mode: 'no-cors',
  //     body,
  //   },
  // )
  //   .then(r => r.json())
  //   .catch(e => {
  //     console.error(e);
  //     return e;
  //   });
};

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
