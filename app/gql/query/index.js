import { gql } from 'apollo-boost';

const RESOURCE_MAP = {
  ContentMaker: 'fullName',
  Creator: 'email',
  SourceContent: 'title',
};

// TODO: IMPLEMENT INTERFACES
export const makeFetchAllQuery = (resourceName, filters) => {
  const resource = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
  if (!filters || !filters.length) {
    return resourceName === 'contentMaker'
      ? gql`{
      all${resource}s {
        id
        ${RESOURCE_MAP[resource]}
      }
    }
  `
      : gql`{
    all${resource}s {
      id
      ${RESOURCE_MAP[resource]}
      link
      contentCategory
    }
  }
`;
  }

  return gql`{
      all${resource}s(filters: ${filters}) {
        id
        ${RESOURCE_MAP[resource]}
      }
    }
  `;
};

export const getAllExcerptsForContentId = id => gql`{
        excerptsForSourceContent(sourceContentId: ${id}) {
          id
          link
          contentMedium
          title
          textContent
          gifUrl
        }
      }
    `;

export const getAllContentsForMakerId = id => gql`
      {
        sourceContentsForContentMaker(contentMakerId: ${id}) {
          id
          title
          link
          contentCategory
        }
      }
    `;

export const getAllChildrenForParent = (parentResource, parentId) => {
  return parentResource === 'contentMaker'
    ? getAllContentsForMakerId(parentId)
    : getAllExcerptsForContentId(parentId);
};
