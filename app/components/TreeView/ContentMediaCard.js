import React from 'react';
import Img from 'react-image';

import FlexContainer from 'components/FlexContainer';
import UserMediaMaker from './UserMediaMaker';
import MediaPlayer from './MediaPlayer';

const convertToIntegerSeconds = seconds => parseInt(Math.round(seconds), 10);

const ALTERNATES = ['PODCAST', 'YOUTUBE'];
const MEDIUMS = ['AUDIO', 'VIDEO', 'IMAGE'];

const ContentMediaCard = ({
  contentId,
  contentCategory,
  contentMedium,
  link,
  gifUrl,
  imageLink,
  __typename,
}) => {
  const [seconds, setSeconds] = React.useState(0);
  const [markIndicator, setMark] = React.useState(false);
  const playerRef = React.useRef(null);

  const setIntSeconds = React.useCallback(
    s => {
      setSeconds(convertToIntegerSeconds(s));
    },
    [setSeconds],
  );

  const handlePause = React.useCallback(
    () => {
      setMark(!markIndicator);
    },
    [setMark, markIndicator],
  );

  const handleSeek = React.useCallback(
    () => {
      if (contentCategory === 'PODCAST' || contentMedium === 'AUDIO') {
        return playerRef.current
          ? setIntSeconds(playerRef.current.audioEl.currentTime)
          : null;
      }
      return setMark(!markIndicator);
    },
    [setIntSeconds, playerRef],
  );

  const stopPlayback = React.useCallback(
    () => {
      if (contentCategory === 'PODCAST' || contentMedium === 'AUDIO') {
        return playerRef.current ? playerRef.current.audioEl.pause() : null;
      }
      return setMark(!markIndicator);
    },
    [setIntSeconds, playerRef, markIndicator, setMark],
  );

  const seekTo = React.useCallback(
    s => {
      if (contentCategory === 'PODCAST' || contentMedium === 'AUDIO') {
        playerRef.current.audioEl.currentTime = s;
      } else if (playerRef && playerRef.current) {
        playerRef.current.seekTo(s);
      }
      setIntSeconds(s);
    },
    [playerRef, contentCategory, setIntSeconds],
  );

  const handleProgress = React.useCallback(
    ({ playedSeconds }) => {
      if (playedSeconds) {
        setIntSeconds(playedSeconds);
      } else if (contentCategory === 'PODCAST' || contentMedium === 'AUDIO') {
        setIntSeconds(playerRef.current.audioEl.currentTime);
      }
    },
    [setIntSeconds, playerRef, contentCategory],
  );

  const handlers = { handlePause, handleSeek, handleProgress };

  if (
    !ALTERNATES.includes(contentCategory) &&
    !MEDIUMS.includes(contentMedium)
  ) {
    return (
      <FlexContainer>
        <h4>NOTHING YET</h4>
      </FlexContainer>
    );
  }

  return (
    <div
      style={{
        justifyContent: 'space-around',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <Img src={[gifUrl, imageLink]} />
      </div>
      <MediaPlayer
        handlers={handlers}
        playerRef={playerRef}
        url={link}
        contentCategory={contentCategory}
        contentMedium={contentMedium}
      />
      <UserMediaMaker
        contentCategory={contentCategory}
        contentMedium={contentMedium}
        contentId={contentId}
        __typename={__typename}
        url={link}
        handlePause={handlePause}
        seconds={seconds}
        seekTo={seekTo}
        stopPlayback={stopPlayback}
      />
    </div>
  );
};

export default ContentMediaCard;
