import React from 'react';
import _ from 'lodash';
// import { FixedSizedList as List } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Button from 'components/Button';
import ViewHeader from 'components/ViewHeader';
// import { FixedSizeTree as Tree } from "react-vtree";
import SourceContentForm, { ContentMediumHeader } from './SourceContentForm';
import SourceContentWorks from './SourceContentWorks';

import { FlexOne, Row } from './Box';

const RESOURCE_MAP = {
  ContentMaker: 'fullName',
  Creator: 'email',
  SourceContent: 'title',
};

const makeFetchAllQuery = resourceName => gql`
      {
        all${resourceName}s {
          id
          ${RESOURCE_MAP[resourceName]}
        }
      }
    `;

function TreeView({ resource = 'ContentMaker' }) {
  const { loading, error, data } = useQuery(makeFetchAllQuery(resource));

  const [open, toggleSetOpen] = React.useState({});
  const [resourceAdding, setAddResource] = React.useState('');
  const [selectedViewState, setViewState] = React.useState({});

  const { selectedChild, selectedParent } = selectedViewState;

  const handleToggleParent = React.useCallback(
    id => {
      if (resourceAdding) return;

      if (!id) {
        toggleSetOpen({});
      } else {
        toggleSetOpen({ ...open, [id]: !open[id] });
      }
      setAddResource('');
    },
    [open, toggleSetOpen, resourceAdding],
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

  const handleClickParent = React.useCallback(
    (e, id) => {
      e.stopPropagation();
      handleToggleParent(id);
      if (selectedParent) {
        setViewState({});
      }
    },
    [selectedParent, handleToggleParent, setViewState],
  );

  const handleToggleAddParent = React.useCallback(
    (e, id) => {
      if (e) {
        e.stopPropagation();
      }
      handleToggleParent(id);
    },
    [handleToggleParent],
  );

  const resetViewState = React.useCallback(
    id => {
      setViewState({});
      handleToggleParent(id);
      setAddResource('');
    },
    [setViewState, handleToggleParent, setAddResource],
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
    makeToggleAddParent: id => e => handleToggleAddParent(e, id),
    makeToggleAddChild: id => e => handleToggleAddChild(e, id),
    makeToggleChild: nodeData => e => handleToggleChild(e, nodeData),
    resetViewState,
    setSelectedViewState,
    showButton,
  };

  const dataPath =
    resource === 'ContentMaker' ? 'allContentMakers' : 'allSourceContents';

  if (loading) return <h3>Loading</h3>;

  return (
    <div style={{ paddingTop: '42px' }}>
      {resourceAdding ? (
        <ViewHeader header="Adding new source" />
      ) : (
        <ContentMediumHeader />
      )}

      <TreeRoot
        data={data[dataPath]}
        handlers={handlers}
        resourceAdding={resourceAdding}
        selectedViewState={selectedViewState}
        open={open}
      />
    </div>
  );
}

const TreeRoot = ({
  data,
  resourceAdding,
  selectedViewState,
  open,
  handlers,
}) => {
  return (
    <div style={{ padding: '1%' }}>
      {data.map(i => (
        <TreeRow
          key={i.id}
          resourceAdding={resourceAdding}
          open={open}
          displayText={i.fullName || i.title}
          handlers={handlers}
          {...selectedViewState}
          {...i}
        />
      ))}
    </div>
  );
};

const TreeRow = ({
  handlers,
  displayText,
  id,
  open,
  parentId,
  resourceAdding,
  selectedChild,
}) => {
  if (
    id === parentId ||
    id === resourceAdding ||
    (!parentId && !resourceAdding)
  ) {
    return (
      <div key={id}>
        <TreeRowHeader
          id={id}
          open={open}
          showButton={handlers.showButton}
          displayText={displayText}
          resourceAdding={resourceAdding}
          handleToggleParent={handlers.makeToggleAddParent(id)}
          handleToggleAddChild={handlers.makeToggleAddChild(id)}
        />
        {resourceAdding === id && <SourceContentForm parentId={id} />}

        {open[id] && (
          <SourceContentWorks
            contentMakerId={id}
            open={open}
            selectedChild={selectedChild}
            {...handlers}
          />
        )}
      </div>
    );
  }
  return null;
};

const TreeRowHeader = ({
  displayText,
  handleToggleParent,
  handleToggleAddChild,
  id,
  open,
  resourceAdding,
  showButton,
}) => {
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
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        {showButton(id) && (
          <FlexOne>
            <Button
              handleClick={handleToggleAddChild}
              text={resourceAdding ? 'Clear' : 'Add Source'}
            />
          </FlexOne>
        )}
      </div>
    </Row>
  );
};

export default TreeView;
