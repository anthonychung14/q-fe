/* eslint-disable */
import * as React from 'react';
import Helmet from 'react-helmet';
import _ from 'lodash';

const DEFAULTS = {
  rarebits: {
    title: 'Some title',
    description: 'Some description',
    url: '{url}',
  },
};

const STRINGS = {
  token_item_list_page: {
    title: '{category}',
    description: 'See the latest crypto assets that are {category}',
    ogTitle: 'Check out {category} assets on Rare Bits',
    ogDescription: 'See the latest crypto assets that are {category}.',
  },
  activity_page: {
    title: 'Transaction Activity',
    description: "Details on the transactions you've initiated.",
    ogTitle: 'Transaction Activity',
    ogDescription: "Details on the transactions you've initiated.",
  },
};

const APP_NAME = {
  rarebits: 'Rare Bits',
};

const DocumentMeta = ({ page, title, props, children }: Props) => {
  const stringSet = Object.assign({}, STRINGS[page]);

  if (title) {
    stringSet.title = title;
  }

  // Fallback to defaults
  const app = window.__APP__;
  _.each(DEFAULTS[app], (value, key) => {
    if (stringSet[key] == null) {
      stringSet[key] = value;
    }
  });

  // Normalize url
  props = Object.assign({}, props);

  let urlPrefix = `${window.location.protocol}//${window.location.hostname}`;
  if (window.location.port) {
    urlPrefix += `:${window.location.port}`;
  }

  if (props.url == null) {
    props.url = document.location;
  } else {
    props.url = urlPrefix + props.url;
  }

  //   if (props.image == null) {
  // props.image = defaultImagePath
  //   }

  // Replace variables
  _.each(stringSet, (localizeString, stringKey) => {
    if (localizeString) {
      _.each(props, (value, key) => {
        localizeString = localizeString.replace(`{${key}}`, value);
      });
      stringSet[stringKey] = localizeString;
    }
  });

  // Normalize Title
  title = stringSet.title;
  const appName = APP_NAME[window.__APP__];
  if (title && title.indexOf(appName) == -1 && appName != null) {
    title = `${title} | ${appName}`;
  }

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={stringSet.description} />
        <link rel="canonical" href={stringSet.url} />
      </Helmet>
      {children}
    </div>
  );
};

type Props = {
  page: string,
  props?: Object,
  title?: string,
};

export default DocumentMeta;
