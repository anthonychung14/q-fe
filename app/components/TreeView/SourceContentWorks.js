import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { TouchableOpacity } from 'react-native';
import Drawer from 'react-drag-drawer';
import Img from 'react-image';

import Button from 'components/Button';
import FlexContainer from 'components/FlexContainer';
import { getAllChildrenForParent } from 'gql/query';

import ContentMediaCard from './ContentMediaCard';

import './modal.css';

const SourceContent = ({
  contentCategory,
  contentMakerId,
  contentMedium,
  gifUrl,
  handleSelectView,
  id,
  imageLink,
  resetViewState,
  selectedChild,
  title,
}) => {
  return (
    <div
      style={{
        padding: '1%',
        backgroundColor: selectedChild === id ? 'silver' : null,
      }}
    >
      <FlexContainer flex={1} row>
        <FlexContainer flex={3}>
          <div>
            <p>{title || `Excerpt for ${id}`}</p>
          </div>
          <div>
            <p>{contentCategory || contentMedium}</p>
          </div>
        </FlexContainer>
        <FlexContainer flex={1}>
          {selectedChild === id ? (
            <Button
              text="Back"
              handleClick={e => {
                e.stopPropagation();
                resetViewState(contentMakerId);
              }}
              type="outline"
            />
          ) : (
            <Button handleClick={handleSelectView} text="View" />
          )}
        </FlexContainer>
      </FlexContainer>
      {selectedChild !== id && (
        <div>
          <Img src={[gifUrl, imageLink]} />
        </div>
      )}
    </div>
  );
};

const SourceContentWorks = ({
  childDataPath,
  parentId,
  open,
  setViewState,
  selectedChild,
  makeToggleChild,
  resetViewState,
  parentType,
  selectedParent,
  parentNode,
}) => {
  const { loading, error, data } = useQuery(
    getAllChildrenForParent(parentType, parentId),
  );

  const dispatch = useDispatch();
  const showMedia = useSelector(state =>
    state.getIn(['skillMode', 'activeDrawer']),
  );
  const handleClose = React.useCallback(
    () => {
      dispatch({
        type: 'mode/SET_MEDIA_DRAWER',
        payload: {
          drawer: parentId,
        },
      });
    },
    [parentId, dispatch],
  );

  return (
    <div
      key={`data-${parentId}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px #30694B solid',
        marginLeft: '5%',
        height: selectedChild ? '500px' : null,
      }}
    >
      {loading && <h4>Loading...</h4>}

      {!loading && open[parentId] && data[childDataPath].length ? (
        data[childDataPath].map(
          i =>
            !selectedChild || i.id === selectedChild ? (
              <SourceContent
                {...i}
                contentMakerId={parentId}
                key={i.id}
                resetViewState={resetViewState}
                setViewState={setViewState}
                parentType={parentType}
                selectedChild={selectedChild}
                handleSelectView={makeToggleChild({
                  parentId,
                  id: i.id,
                })}
              />
            ) : null,
        )
      ) : (
        <h5>No sources yet. You should add one!</h5>
      )}
      {selectedParent &&
        selectedChild && (
          <>
            <MediaDisplayer
              childData={data}
              childId={selectedChild}
              childDataPath={childDataPath}
              parentNode={parentNode}
              selectedParentId={selectedParent}
            />
          </>
        )}

      {!loading && error && <h4>Error!</h4>}
      <Drawer open={Boolean(showMedia)} allowClose modalElementClass="modal">
        <TouchableOpacity
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          onClick={handleClose}
        >
          <div id="x">X</div>
        </TouchableOpacity>
        <MediaDisplayer
          childData={data}
          childId={selectedChild}
          childDataPath={childDataPath}
          parentNode={parentNode}
          showMedia={showMedia}
          selectedParentId={selectedParent}
        />
      </Drawer>
    </div>
  );
};

const MediaDisplayer = ({
  childDataPath,
  childData,
  childId,
  parentNode,
  showMedia,
  selectedParentId,
}) => {
  let media = parentNode;
  let contentId = parentNode.id;

  if (childId) {
    const data = childData[childDataPath];
    media = data.find(i => i.id === childId) || parentNode;
    contentId = childId;
  }

  return parentNode.id === selectedParentId || parentNode.id === showMedia ? (
    <ContentMediaCard {...media} contentId={contentId} />
  ) : null;
};

export default SourceContentWorks;
