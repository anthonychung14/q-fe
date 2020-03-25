import React from 'react';
import { Toast } from 'antd-mobile';
import { branch } from 'recompose';
import _ from 'lodash';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import { withCreateExcerpt, withCreateSourceCard } from 'gql/mutations';

import Button from 'components/Button';
import Container from 'components/Container';
import TextInput from 'components/TextInput';
import FlexContainer from 'components/FlexContainer';
import TextArea from 'components/TextAreaInput';

import MediaPlayer from './MediaPlayer';

const usePlaybackHandlers = (contentCategory, start, end) => {
  const playerRef = React.useRef(null);

  const seekTo = React.useCallback(
    s => {
      if (contentCategory === 'PODCAST') {
        playerRef.current.audioEl.currentTime = s;
      } else if (playerRef && playerRef.current) {
        playerRef.current.seekTo(s);
      }
    },
    [playerRef, contentCategory],
  );

  const handleGoStart = React.useCallback(() => seekTo(start), [start]);
  const handleGoEnd = React.useCallback(() => seekTo(end), [end]);
  const handleStopPlaying = React.useCallback(
    () => {
      if (contentCategory === 'PODCAST' && playerRef.current) {
        playerRef.current.audioEl.pause();
      }
    },
    [end],
  );

  return {
    playerRef,
    handleGoEnd,
    handleGoStart,
    handleStopPlaying,
  };
};

const CreateButtonGroup = ({
  mutate,
  disabled,
  handleStopPlaying,
  setModalVisible,
  variables,
  toCreate,
}) => (
  <div style={{ paddingTop: '10px' }}>
    <Button
      handleClick={e => {
        e.stopPropagation();
        handleStopPlaying();
        setModalVisible(false);
      }}
      text="Cancel"
      type="outline"
    />
    <Button
      disabled={disabled}
      type={disabled ? 'outline' : 'primary'}
      handleClick={e => {
        e.stopPropagation();
        Toast.loading('Creating...');
        mutate({ variables }).then(r => {
          Toast.success('Created');
        });
        handleStopPlaying();
        setModalVisible(false);
      }}
      text={`Create ${_.startCase(toCreate)}`}
    />
  </div>
);

const useTextHandlers = (title, contentId) => {
  const [warrant, setWarrant] = React.useState('');
  const [subheader, setSubheader] = React.useState('');

  const handleSubheaderChange = React.useCallback(
    v => {
      setSubheader(v);
    },
    [setSubheader],
  );

  const handleWarrantChange = React.useCallback(
    v => {
      setWarrant(v);
    },
    [setWarrant],
  );

  return {
    handleSubheaderChange,
    handleWarrantChange,
    sourceCardValues: {
      subheader,
      warrant,
      header: title,
      excerptId: parseInt(contentId, 10),
    },
  };
};

const ExcerptConfirm = ({
  excerptValues,
  modalVisible,
  mutate,
  setModalVisible,
  titleInput,
  toCreate,
}) => {
  const {
    playerRef,
    handleGoStart,
    handleGoEnd,
    handleStopPlaying,
  } = usePlaybackHandlers(
    excerptValues.contentCategory,
    excerptValues.startPosition,
    excerptValues.endPosition,
  );

  const {
    handleSubheaderChange,
    handleWarrantChange,
    sourceCardValues,
  } = useTextHandlers(titleInput, excerptValues.contentId);

  if (!excerptValues.contentId) return null;

  const variables = { ...excerptValues, ...sourceCardValues };

  return (
    <Rodal
      visible={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      closeMaskOnClick={false}
      animation="slideUp"
      height={500}
    >
      <Container around style={{ height: '100%' }}>
        <FlexContainer center>
          <h3>{excerptValues.title || excerptValues.titleInput}</h3>
        </FlexContainer>
        <MediaPlayer {...excerptValues} type="excerpt" playerRef={playerRef} />
        <FlexContainer>
          {toCreate === 'sourceCard' && (
            <>
              <TextInput
                input={{ onChange: handleSubheaderChange }}
                label="subheader"
              />
              <TextArea
                meta={{}}
                input={{ onChange: handleWarrantChange }}
                label="warrant"
              />
            </>
          )}
          {toCreate === 'excerpt' && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <h4>{excerptValues.startPosition} Start</h4>
                <h4>{excerptValues.endPosition} End</h4>
              </div>
              <Container
                style={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                }}
              >
                <div style={{ flex: '0 50%' }}>
                  <Button
                    handleClick={handleGoStart}
                    text="Go Start"
                    type="outline"
                  />
                </div>
                <div style={{ flex: '0 50%' }}>
                  <Button
                    handleClick={handleGoEnd}
                    text="Go End"
                    type="outline"
                  />
                </div>
              </Container>
            </>
          )}
        </FlexContainer>
        <CreateButtonGroup
          mutate={mutate}
          toCreate={toCreate}
          handleStopPlaying={handleStopPlaying}
          setModalVisible={setModalVisible}
          variables={variables}
        />
      </Container>
    </Rodal>
  );
};

const withCreate = branch(
  ({ toCreate }) => toCreate === 'excerpt',
  withCreateExcerpt,
  withCreateSourceCard,
);

export default withCreate(ExcerptConfirm);
