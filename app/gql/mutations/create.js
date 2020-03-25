import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

import {
  getAllContentsForMakerId,
  getAllExcerptsForContentId,
} from 'gql/query';

const CREATE_EXCERPT_FOR_CONTENT = gql`
  mutation CreateExcerptForContent(
    $startPosition: Int!
    $endPosition: Int!
    $contentId: ID!
    $gifUrl: String!
  ) {
    createExcerpt(
      startPosition: $startPosition
      endPosition: $endPosition
      contentId: $contentId
      gifUrl: $gifUrl
    ) {
      id
      sourceContentId
      gifUrl
    }
  }
`;

export const CREATE_SOURCE_CONTENT_FOR_MAKER = gql`
  mutation CreateSourceContentForContentMaker(
    $link: String!
    $content_maker_id: ID!
    $title: String
  ) {
    createSourceContent(
      link: $link
      contentMakerId: $content_maker_id
      title: $title
    ) {
      id
      link
      title
      contentCategory
    }
  }
`;

export const CREATE_SOURCE_CARD_BY_CREATOR = gql`
  mutation CreateSourceCard(
    $header: String!
    $excerptId: ID!
    $warrant: String!
    $subheader: String
    $gifUrl: String!
  ) {
    createSourceCard(
      header: $header
      excerptId: $excerptId
      warrant: $warrant
      subheader: $subheader
      gifUrl: $gifUrl
    ) {
      id
      header
      warrant
      gifUrl
    }
  }
`;

// is only for adding source
// TODO: you have to add excerpts next
const updateMakerContents = ({ contentMakerId, parentId }) => ({
  update: (cache, { data: { createSourceContent } }) => {
    const query = getAllContentsForMakerId(contentMakerId || parentId);
    const { sourceContentsForContentMaker } = cache.readQuery({ query });

    cache.writeQuery({
      query,
      data: {
        sourceContentsForContentMaker: sourceContentsForContentMaker.concat([
          createSourceContent,
        ]),
      },
    });
  },
});

const updateExcerpts = ({ contentId }) => ({
  update: (cache, { data: { createExcerpt } }) => {
    const query = getAllExcerptsForContentId(contentId);
    const { excerptsForSourceContent } = cache.readQuery({ query });

    console.log('cache is', cache, excerptsForSourceContent);
    cache.writeQuery({
      query,
      data: {
        excerptsForSourceContent: excerptsForSourceContent.concat([
          createExcerpt,
        ]),
      },
    });
  },
});

export const withCreateSourceContent = graphql(
  CREATE_SOURCE_CONTENT_FOR_MAKER,
  { options: updateMakerContents },
);

export const withCreateExcerpt = graphql(CREATE_EXCERPT_FOR_CONTENT, {
  options: updateExcerpts,
});

export const withCreateSourceCard = graphql(CREATE_SOURCE_CARD_BY_CREATOR, {
  // implement update
  options: {},
});
