import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

export const withCreateExcerpt = graphql(gql`
  mutation CreateExcerptForContent(
    $startPosition: Int!
    $endPosition: Int!
    $contentId: ID!
  ) {
    createExcerpt(
      startPosition: $startPosition
      endPosition: $endPosition
      contentId: $contentId
    ) {
      sourceContentId
    }
  }
`);

export const withCreateSourceContent = graphql(gql`
  mutation CreateSourceContentForContentMaker(
    $link: String!
    $content_maker_id: ID!
  ) {
    createSourceContent(link: $link, contentMakerId: $content_maker_id) {
      link
    }
  }
`);
