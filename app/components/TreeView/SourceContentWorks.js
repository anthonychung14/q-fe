import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Button from 'components/Button';
import ContentMediaCard from './ContentMediaCard';
import { Row, FlexOne } from './Box';

const getAllForId = id => gql`
      {
        sourceContentsForContentMaker(contentMakerId: ${id}) {
          id
          title
          link
          contentCategory
        }
      }
    `;

const SourceContent = ({
  id,
  contentMakerId,
  title,
  handleSelectView,
  selectedChild,
  resetViewState,
}) => {
  return (
    <Row
      style={{
        padding: '1%',
        justifyContent: 'space-around',
        backgroundColor: selectedChild === id ? 'silver' : null,
      }}
      onClick={handleSelectView}
    >
      <FlexOne>
        <h4>{title}</h4>
      </FlexOne>
      {selectedChild === id && (
        <FlexOne>
          <Button
            text="Back"
            handleClick={e => {
              e.stopPropagation();
              resetViewState(contentMakerId);
            }}
            type="outline"
          />
        </FlexOne>
      )}
    </Row>
  );
};

const SourceContentWorks = ({
  contentMakerId,
  open,
  setViewState,
  selectedChild,
  makeToggleChild,
  resetViewState,
}) => {
  const { loading, error, data } = useQuery(getAllForId(contentMakerId));

  return (
    <div
      key={`data-${contentMakerId}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px #30694B solid',
        marginLeft: '5%',
      }}
    >
      {!loading &&
      open[contentMakerId] &&
      data.sourceContentsForContentMaker.length ? (
        data.sourceContentsForContentMaker.map(
          i =>
            !selectedChild || i.id === selectedChild ? (
              <SourceContent
                {...i}
                contentMakerId={contentMakerId}
                key={i.id}
                resetViewState={resetViewState}
                setViewState={setViewState}
                handleSelectView={makeToggleChild({
                  parentId: contentMakerId,
                  id: i.id,
                })}
              />
            ) : null,
        )
      ) : (
        <h5>No sources yet. You should add one!</h5>
      )}
      {!loading && error && <h4>Error!</h4>}
      {selectedChild && (
        <ContentMediaCard contentId={selectedChild} data={data} />
      )}
    </div>
  );
};

export default SourceContentWorks;
