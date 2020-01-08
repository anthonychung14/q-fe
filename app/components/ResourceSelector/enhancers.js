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
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';

import { WhiteSpace, WingBlank } from 'antd-mobile';
import { getAuth } from 'selectors/firebase';
import { fetchAirtableApi, fetchGiphy, postResource } from 'utils/api';
import { withLoading, withSetGif } from 'utils/enhancers';
import { currentTimeSeconds, getStorageDate } from 'utils/time';

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
      const {
        loading,
        setRecords,
        setLoading,
        search,
        resourceType,
      } = this.props;

      if (search !== prev.search) {
        const records = await fetchAirtableApi(resourceType, search);

        setRecords(new Fuse(_.reverse(records), options), () => {
          setLoading(false);
        });
      } else if (!loading && prev.loading) {
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

export const withCreateResource = compose(
  withFirebase,
  withLoading,
  withSetGif,
  connect(state => ({ auth: getAuth(state) })),
  withHandlers({
    createResource: ({
      reportType,
      firebase,
      auth,
      setLoading,
      setGif,
    }) => async (resourceType, values) => {
      setLoading(true);
      const data = await fetchGiphy();

      setGif(data);
      const withGifVals = values
        .set('gif_url', data.image_url)
        .set('giphy_id', data.id)
        .set('miner_google_uid', auth.uid);

      if (reportType === 'incident') {
        const storageDate = getStorageDate();
        await firebase.push(
          reportType,
          withGifVals
            .set('type', resourceType)
            .set('reported_seconds', currentTimeSeconds())
            .set('display_date', storageDate)
            .toJS(),
        );
      } else {
        await postResource({ resourceType, values: withGifVals });
      }
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
