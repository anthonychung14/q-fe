import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';

// import AutoSizer from 'react-virtualized-auto-sizer';
// import { FixedSizeTree as Tree } from 'react-vtree';
import { LEVELS } from 'gql/types';
import { getRootLevel } from 'selectors/skill_mode';
import Button from 'components/Button';
import FlexContainer from 'components/FlexContainer';
import ViewHeader from 'components/ViewHeader';
import { makeFetchAllQuery } from 'gql/query';
import SourceContentForm from './SourceContentForm';
import SourceContentWorks from './SourceContentWorks';
import SimonHeader from './SimonHeader';

import { FlexOne, Row } from './Box';

function TreeView() {
  const resourceType = useSelector(getRootLevel);

  const dataPath =
    resourceType === 'contentMaker' ? 'allContentMakers' : 'allSourceContents';
  const childResourceType =
    LEVELS[LEVELS.findIndex(i => i === resourceType) + 1];
  const childDataPath =
    childResourceType === 'sourceContent'
      ? 'sourceContentsForContentMaker'
      : 'excerptsForSourceContent';

  const { loading, data } = useQuery(makeFetchAllQuery(resourceType));

  // React.useEffect(
  //   () => {
  //     if (cart.size) {
  //       refetch({ filters, resource });
  //     }
  //   },
  //   [cart, refetch, resource],
  // );

  const [open, toggleSetOpen] = React.useState({});
  const [resourceAdding, setAddResource] = React.useState('');
  const [selectedViewState, setViewState] = React.useState({});

  const { selectedChild, selectedParent } = selectedViewState;

  const toggleParentById = React.useCallback(
    id => {
      if (resourceAdding) return;

      if (selectedChild && id === selectedParent) return;

      if (!id) {
        toggleSetOpen({});
      } else if (selectedParent && selectedChild) {
        setViewState({});
      }

      toggleSetOpen({ ...open, [id]: !open[id] });

      setAddResource('');
    },
    [open, toggleSetOpen, resourceAdding, selectedParent, selectedChild],
  );

  const handleToggleAddChild = React.useCallback(
    (e, id) => {
      if (resourceAdding === id) {
        setAddResource('');
      } else {
        setAddResource(id);
        toggleSetOpen({});
      }
    },
    [resourceAdding, setAddResource, toggleSetOpen],
  );
  const handleToggleParent = React.useCallback(
    (e, id) => {
      e.stopPropagation();
      toggleParentById(id);
    },
    [selectedParent, toggleParentById, setViewState],
  );

  const resetViewState = React.useCallback(
    id => {
      if (selectedChild === id) {
        setViewState({ selectedParent, selectedChild: null });
      } else {
        setViewState({});
        toggleParentById(id);
        setAddResource('');
      }
    },
    [
      setViewState,
      toggleParentById,
      setAddResource,
      selectedChild,
      selectedParent,
    ],
  );

  const setSelectedViewState = React.useCallback(
    (child, parent) => {
      setViewState({ selectedChild: child, selectedParent: parent });
    },
    [setViewState],
  );

  const handleToggleChild = React.useCallback(
    (e, { parentId, id }) => {
      e.stopPropagation();
      if (selectedParent === parentId && selectedChild === id) {
        setViewState({ selectedChild: '', selectedParent: '' });
      } else {
        setViewState({
          selectedChild: id,
          selectedParent: parentId,
        });
      }
    },
    [selectedParent, selectedChild, setViewState],
  );

  const showButton = id => open[id] || resourceAdding === id;

  const handlers = {
    makeToggleAddChild: id => e => handleToggleAddChild(e, id),
    makeToggleChild: nodeData => e => handleToggleChild(e, nodeData),
    makeHandleClickParent: id => e => handleToggleParent(e, id),
    resetViewState,
    setSelectedViewState,
    showButton,
  };

  const rowData = _.get(data, dataPath, []).filter(
    ({ contentCategory, contentMedium, fullName }) =>
      contentCategory === 'PODCAST' || contentMedium === 'AUDIO' || fullName,
  );

  return (
    <FlexContainer style={{ paddingTop: '42px' }}>
      <TreeHeader {...selectedViewState} resourceAdding={resourceAdding} />
      <div style={{ padding: '1%' }}>
        {loading && rowData.length === 0 ? (
          <FlexContainer center style={{ paddingBottom: '42px' }}>
            <h3>Loading</h3>
          </FlexContainer>
        ) : (
          <>
            {rowData.map(i => (
              <TreeRow
                childDataPath={childDataPath}
                displayText={i.fullName || i.title}
                handlers={handlers}
                key={i.id}
                open={open}
                parentNode={i}
                parentType={resourceType}
                resourceAdding={resourceAdding}
                resourceType={childResourceType}
                {...selectedViewState}
                {...i}
              />
            ))}
          </>
        )}
      </div>
    </FlexContainer>
  );
}

const TreeHeader = ({ resourceAdding, selectedChild, selectedParent }) => {
  if (resourceAdding) {
    return <ViewHeader header="Adding new source" />;
  }

  return !selectedChild || !selectedParent ? <SimonHeader /> : null;
};

const TreeRow = ({
  handlers,
  displayText,
  contentCategory,
  id,
  open,
  selectedParent,
  resourceAdding,
  resourceType,
  selectedChild,
  childDataPath,
  parentType,
  parentNode,
}) => {
  if (
    id === selectedParent ||
    id === resourceAdding ||
    (!selectedParent && !resourceAdding)
  ) {
    return (
      <div key={id}>
        <TreeRowHeader
          displayText={displayText}
          contentCategory={contentCategory}
          handleToggleAddChild={handlers.makeToggleAddChild(id)}
          handleToggleParent={handlers.makeHandleClickParent(id)}
          id={id}
          open={open}
          parentId={selectedParent}
          parentType={parentType}
          resourceAdding={resourceAdding}
          showButton={handlers.showButton}
        />
        {resourceAdding === id &&
          parentType === 'contentMaker' && (
            <SourceContentForm parentId={id} resourceType={resourceType} />
          )}

        {open[id] && (
          <SourceContentWorks
            childDataPath={childDataPath}
            open={open}
            parentId={id}
            parentNode={parentNode}
            parentType={parentType}
            resourceType={resourceType}
            selectedChild={selectedChild}
            selectedParent={selectedParent}
            {...handlers}
          />
        )}
      </div>
    );
  }
  return null;
};

const TreeRowHeader = ({
  contentCategory,
  displayText,
  handleToggleAddChild,
  handleToggleParent,
  handleToggleShowMedia,
  id,
  open,
  parentId,
  parentType,
  resourceAdding,
  showButton,
}) => {
  if (open[parentId] && parentId !== id) return null;

  return (
    <Row
      style={{
        backgroundColor: open[id] ? '#87C38F' : null,
        justifyContent: 'space-between',
      }}
      onClick={handleToggleParent}
    >
      <div style={{ flex: 2 }}>
        <h4 style={{ padding: '1%' }}>{displayText}</h4>
        <h5 style={{ padding: '1%' }}>{contentCategory}</h5>
      </div>
      <HeaderAction
        id={id}
        handleToggleAddChild={handleToggleAddChild}
        handleToggleShowMedia={handleToggleShowMedia}
        showButton={showButton}
        resourceAdding={resourceAdding}
        parentId={parentId}
        parentType={parentType}
      />
    </Row>
  );
};

const HeaderAction = ({
  id,
  handleToggleAddChild,
  showButton,
  resourceAdding,
  parentType,
  parentId,
}) => {
  let text = resourceAdding ? 'Clear' : 'Add Source';
  const dispatch = useDispatch();
  const showMedia = useSelector(state =>
    state.getIn(['skillMode', 'activeDrawer']),
  );

  const handleClick = React.useCallback(
    e => {
      e.stopPropagation();
      if (parentType === 'sourceContent') {
        dispatch({
          type: 'mode/SET_MEDIA_DRAWER',
          payload: {
            drawer: id,
          },
        });
      } else {
        handleToggleAddChild(e, id);
      }
    },
    [id, dispatch, showMedia, resourceAdding, parentType, parentId],
  );

  if (parentType === 'sourceContent') {
    text = 'Show';
  }

  if (showButton(id) || id === parentId) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <FlexOne>
          <Button
            handleClick={handleClick}
            text={text}
            style={{ zIndex: 10 }}
          />
        </FlexOne>
      </div>
    );
  }

  return null;
};

export default TreeView;
