import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Button from 'components/Button';
// import { FixedSizeTree as Tree } from "react-vtree";
import ContentMediaCard from './ContentMediaCard';
import SourceContentForm from './SourceContentForm';

const RESOURCE_MAP = {
  Author: 'fullName',
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

const children = [
  {
    title: 'title',
    contentCategory: 'YOUTUBE',
    url:
      'https://www.youtube.com/watch?v=DZIA7H24F48&list=RDDZIA7H24F48&start_radio=1',
    id: 1,
  },
  {
    title: 'bar title',
    contentCategory: 'PODCAST',
    url:
      'http://content.blubrry.com/52716/Defenders_3_Doctrine_of_Creation_Part_1_.mp3',
    id: 'b',
  },
  {
    title: 'baz',
    contentCategory: 'YOUTUBE',
    url:
      'https://www.youtube.com/watch?v=DZIA7H24F48&list=RDDZIA7H24F48&start_radio=1',
    id: 'c',
  },
];

const makeChildren = num => children.slice(num);

const ROW = {
  display: 'flex',
  flex: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  border: '1px black solid',
};

const Row = ({ children, style, onClick }) => (
  <div style={{ ...ROW, ...style }} onClick={onClick}>
    {children}
  </div>
);

const SourceContent = ({
  id,
  title,
  setViewState,
  authorId,
  selectedViewState,
  resetViewState,
}) => {
  // TODO: make this better
  const handleView = React.useCallback(
    () => {
      if (
        selectedViewState.authorId === authorId &&
        selectedViewState.sourceContentId === id
      ) {
        setViewState({ sourceContentId: '', authorId: '' });
      } else {
        setViewState({ sourceContentId: id, authorId });
      }
    },
    [setViewState, title, authorId, selectedViewState],
  );

  return (
    <Row
      style={{
        padding: '1%',
        justifyContent: 'space-around',
        backgroundColor:
          selectedViewState.sourceContentId === id ? 'silver' : null,
      }}
      onClick={handleView}
    >
      <FlexOne>
        <h4>{title}</h4>
      </FlexOne>
      {selectedViewState.sourceContentId === id && (
        <FlexOne>
          <Button
            text="Back"
            handleClick={e => {
              e.stopPropagation();
              resetViewState(id);
            }}
            type="outline"
          />
        </FlexOne>
      )}
    </Row>
  );
};

const SourceContentWorks = ({
  id,
  open,
  sourceContentId,
  sourceContentWorks,
  setViewState,
  selectedViewState,
  setModalVisible,
  resetViewState,
}) => (
  <div
    key={`data-${id}`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      border: '1px #30694B solid',
      marginLeft: '5%',
    }}
  >
    {open[id] &&
      sourceContentWorks.map(
        i =>
          !sourceContentId || i.id === sourceContentId ? (
            <SourceContent
              {...i}
              key={i.id}
              setViewState={setViewState}
              authorId={id}
              selectedViewState={selectedViewState}
              resetViewState={resetViewState}
            />
          ) : null,
      )}
    {sourceContentId && (
      <ContentMediaCard
        contentId={sourceContentId}
        setModalVisible={setModalVisible}
        {...sourceContentWorks.find(i => i.id === sourceContentId) || {}}
      />
    )}
  </div>
);

const FlexOne = ({ children }) => <div style={{ flex: 1 }}>{children}</div>;

function TreeView() {
  const { loading, error, data } = useQuery(makeFetchAllQuery('Author'));
  const [open, toggleSetOpen] = React.useState({});
  const [resourceAdding, setAddResource] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedViewState, setViewState] = React.useState({});
  const { sourceContentId, authorId } = selectedViewState;

  const handleToggle = React.useCallback(
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

  const resetViewState = React.useCallback(
    id => {
      setViewState({});
      handleToggle(id);
      setAddResource('');
    },
    [setViewState, handleToggle, setAddResource],
  );

  if (loading) return <h3>Loading</h3>;

  const sourceContentWorks = makeChildren(0);

  return (
    <div style={{ padding: '1%' }}>
      {(data && data.allAuthors ? data.allAuthors : []).map(
        ({ id, fullName }) =>
          id === authorId ||
          id === resourceAdding ||
          (!authorId && !resourceAdding) ? (
            <div key={id}>
              <div
                style={{
                  ...ROW,
                  backgroundColor: open[id] ? '#87C38F' : null,
                  justifyContent: 'space-between',
                }}
                onClick={() => {
                  handleToggle(id);
                  if (authorId) {
                    setViewState({});
                  }
                }}
              >
                <div style={{ flex: 2 }}>
                  <h4 style={{ padding: '1%' }}>{fullName}</h4>
                </div>
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
                      handleClick={e => {
                        e.stopPropagation();

                        if (resourceAdding === id) {
                          setAddResource('');
                        } else {
                          setAddResource(id);
                          toggleSetOpen({});
                        }
                      }}
                      text={resourceAdding ? 'Clear' : 'Add Source'}
                    />
                  </FlexOne>
                </div>
              </div>
              {resourceAdding === id && <SourceContentForm parentId={id} />}

              {open[id] && (
                <SourceContentWorks
                  id={id}
                  open={open}
                  sourceContentId={sourceContentId}
                  sourceContentWorks={sourceContentWorks}
                  setViewState={setViewState}
                  selectedViewState={selectedViewState}
                  setModalVisible={setModalVisible}
                  resetViewState={resetViewState}
                />
              )}
            </div>
          ) : null,
      )}
    </div>
  );
}

export default TreeView;
