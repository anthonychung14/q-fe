import React from 'react';

import ExcerptMaker from './ExcerptMaker';
import MediaPlayer from './MediaPlayer';

const convertToIntegerSeconds = seconds => parseInt(Math.round(seconds), 10);

const ALTERNATES = ['PODCAST', 'YOUTUBE'];

const ContentMediaCard = ({ contentId, data = {} }) => {
  const { sourceContentsForContentMaker = [] } = data;
  const { contentCategory, link } =
    sourceContentsForContentMaker.find(i => i.id === contentId) || {};

  if (!ALTERNATES.includes(contentCategory)) {
    return <h4>NOTHING YET</h4>;
  }

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
    e => {
      setMark(!markIndicator);
    },
    [setMark, markIndicator],
  );

  const handleSeek = React.useCallback(
    s => {
      if (contentCategory === 'PODCAST' && playerRef.current) {
        setIntSeconds(playerRef.current.audioEl.currentTime);
        // console.log(playerRef.current.audioEl.currentTime);
      } else {
        setIntSeconds(s);
      }
    },
    [setIntSeconds, playerRef],
  );

  const seekTo = React.useCallback(
    s => {
      if (contentCategory === 'PODCAST') {
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
      } else if (contentCategory === 'PODCAST') {
        setIntSeconds(playerRef.current.audioEl.currentTime);
      }
    },
    [setIntSeconds, playerRef, contentCategory],
  );

  const handlers = { handlePause, handleSeek, handleProgress };

  return (
    <div style={{ flexDirection: 'space-between', flex: 1 }}>
      <MediaPlayer
        handlers={handlers}
        playerRef={playerRef}
        contentCategory={contentCategory}
        url={link}
      />
      <ExcerptMaker
        seconds={seconds}
        seekTo={seekTo}
        contentId={contentId}
        url={link}
        handlePause={handlePause}
        contentCategory={contentCategory}
      />
    </div>
  );
};

export default ContentMediaCard;
