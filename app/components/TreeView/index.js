import React from 'react';
// import { FixedSizeTree as Tree } from "react-vtree";
import Select from 'react-select';

import ContentMediaCard from './ContentMediaCard';
import Button from './Button';

const makeChildren = num => children.slice(num);

const CONTENT_CATEGORIES = [
  { value: 'PODCAST', label: 'PODCAST' },
  { value: 'YOUTUBE', label: 'YOUTUBE' },
  { value: 'BOOK', label: 'BOOK' },
];

const children = [
  {
    title: 'title',
    content_category: 'PODCAST',
    link: 'link',
    id: 'a',
  },
  {
    title: 'bar title',
    content_category: 'PODCAST',
    link: 'link',
    id: 'b',
  },
  {
    title: 'baz',
    content_category: 'PODCAST',
    link: 'link',
    id: 'c',
  },
];

const DATA = [
  {
    fullName: 'Anthony Chung',
    id: 'a',
    sourceContentWorks: makeChildren(1),
  },
  {
    fullName: 'Bob Fullname',
    id: 'b',
    sourceContentWorks: makeChildren(2),
  },
  {
    fullName: 'Charlie Chaplin',
    id: 'c',
    sourceContentWorks: makeChildren(0),
  },
];

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
}) => {
  // TODO: make this better
  const handleView = React.useCallback(
    () => {
      setViewState({ sourceContentId: title, authorId });
    },
    [setViewState, title, authorId],
  );

  return (
    <Row
      style={{ padding: '1%', justifyContent: 'space-around' }}
      onClick={handleView}
    >
      <h5>{title}</h5>
    </Row>
  );
};

const SourceContentForm = ({ setModalVisible }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      border: '1px red solid',
      marginLeft: '5%',
      padding: '2%',
    }}
  >
    <h3>Add Source Content</h3>
    <form>
      <fieldset id="group1">
        <Select options={CONTENT_CATEGORIES} />
      </fieldset>

      <fieldset id="group3">
        <Button
          text="Submit"
          handleClick={() => {
            setModalVisible(true);
          }}
        />
      </fieldset>
    </form>
  </div>
);

const SourceContentWorks = ({
  id,
  open,
  sourceContentId,
  sourceContentWorks,
  setViewState,
  selectedViewState,
  setModalVisible,
}) => (
  <div
    key={`data-${id}`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      border: '1px red solid',
      marginLeft: '5%',
    }}
  >
    {open[id] &&
      sourceContentWorks.map(
        i =>
          !sourceContentId || i.title === sourceContentId ? (
            <SourceContent
              {...i}
              key={i.id}
              setViewState={setViewState}
              authorId={id}
              selectedViewState={selectedViewState}
            />
          ) : null,
      )}
    {sourceContentId && (
      <ContentMediaCard
        contentId={sourceContentId}
        setModalVisible={setModalVisible}
      />
    )}
  </div>
);

function TreeView() {
  const [data, setData] = React.useState(DATA);
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

  return (
    <div style={{ padding: '1%' }}>
      {data.map(
        ({ id, sourceContentWorks, fullName }) =>
          id === authorId ||
          id === resourceAdding ||
          (!authorId && !resourceAdding) ? (
            <div key={id}>
              <div
                style={{
                  ...ROW,
                  backgroundColor: open[id] ? 'silver' : null,
                  justifyContent: 'space-between',
                }}
                onClick={() => {
                  handleToggle(id);
                  if (authorId) {
                    setViewState({});
                  }
                }}
              >
                <h4 style={{ padding: '1%' }}>{fullName}</h4>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                    text={resourceAdding ? 'Clear' : 'Add Content Source'}
                  />
                  {sourceContentId && (
                    <Button
                      text="Clear"
                      handleClick={() => {
                        setViewState({});
                        toggleSetOpen({});
                        setAddResource('');
                      }}
                    />
                  )}
                </div>
              </div>
              {resourceAdding === id && <SourceContentForm />}

              {open[id] && (
                <SourceContentWorks
                  id={id}
                  open={open}
                  sourceContentId={sourceContentId}
                  sourceContentWorks={sourceContentWorks}
                  setViewState={setViewState}
                  selectedViewState={selectedViewState}
                  setModalVisible={setModalVisible}
                />
              )}
            </div>
          ) : null,
      )}
    </div>
  );
}

export default TreeView;
