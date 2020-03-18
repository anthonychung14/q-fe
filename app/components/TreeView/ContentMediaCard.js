import React from 'react';

import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import Button from './Button';

// const first =
//   "";

const YouTubePlayer = ({
  url,
  handleProgress,
  handlePause,
  handleSeek,
  playerRef,
}) => {
  return (
    // TODO: fix inline styles
    <div style={{ position: 'relative', height: '400px' }}>
      <ReactPlayer
        url={url}
        playing
        onPause={handlePause}
        onProgress={handleProgress}
        onSeek={handleSeek}
        width="100%"
        height="100%"
        ref={playerRef}
      />
    </div>
  );
};

function useMarkPosition(markType) {
  const [position, setPosition] = React.useState(0);

  const markPosition = React.useCallback(
    seconds => {
      setPosition(seconds);
    },
    [setPosition],
  );

  return [position, markPosition];
}

// <ReactAudioPlayer src={first} autoPlay controls />
// Time-bound excerpt maker
const ExcerptMaker = ({ contentId, seconds, seekTo, handlePause }) => {
  const [start, setStart] = useMarkPosition('start');
  const [end, setEnd] = useMarkPosition('end');
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <div>
      <div
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          display: 'flex',
        }}
      >
        <div>
          <h4>{start.toFixed(2)} sec</h4>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button handleClick={() => setStart(seconds)} text="Set Start" />
            <Button handleClick={() => seekTo(start)} text="Go Start" />
          </div>
        </div>
        <div>
          <h4>{seconds.toFixed(2)} seconds</h4>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button handleClick={() => seekTo(seconds - 20)} text="REW 20" />
            <Button handleClick={() => seekTo(seconds - 5)} text="REW 5" />
            <Button handleClick={() => seekTo(seconds + 5)} text="FF 5" />
            <Button handleClick={() => seekTo(seconds + 20)} text="FF 20" />
          </div>
        </div>
        <div>
          <h4>{end.toFixed(2)} sec</h4>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button handleClick={() => setEnd(seconds)} text="Set End" />
            <Button handleClick={() => seekTo(end)} text="Go End" />
          </div>
        </div>
      </div>
      <Button
        text="Make Excerpt"
        handleClick={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <Rodal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        closeMaskOnClick={false}
      >
        <div>Content</div>
      </Rodal>
    </div>
  );
};

const AudioPlayer = ({
  playerRef,
  url,
  handleSeek,
  handlePause,
  handleProgress,
}) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <ReactAudioPlayer
        src={url}
        ref={playerRef}
        controls
        onListen={handleProgress}
        onPause={handlePause}
        onSeeked={handleSeek}
        listenInterval={200}
      />
    </div>
  );
};

const MediaPlayer = ({ contentCategory, handlers, playerRef, url }) => {
  if (contentCategory === 'PODCAST') {
    return <AudioPlayer {...handlers} playerRef={playerRef} url={url} />;
  }

  return <YouTubePlayer {...handlers} playerRef={playerRef} url={url} />;
};

const ContentMediaCard = ({ contentId, contentCategory, url }) => {
  const [seconds, setSeconds] = React.useState(0);
  const [markIndicator, setMark] = React.useState(false);
  const playerRef = React.useRef(null);

  const handlePause = React.useCallback(
    e => {
      setMark(!markIndicator);
    },
    [setMark, markIndicator],
  );

  const handleSeek = React.useCallback(
    s => {
      if (contentCategory === 'PODCAST' && playerRef.current) {
        setSeconds(playerRef.current.audioEl.currentTime);
        // console.log(playerRef.current.audioEl.currentTime);
      } else {
        setSeconds(s);
      }
    },
    [setSeconds, playerRef],
  );

  const seekTo = React.useCallback(
    s => {
      if (contentCategory === 'PODCAST') {
        playerRef.current.audioEl.currentTime = s;
      } else if (playerRef && playerRef.current) {
        playerRef.current.seekTo(s);
      }
      setSeconds(s);
    },
    [playerRef, contentCategory],
  );

  const handleProgress = React.useCallback(
    ({ playedSeconds }) => {
      if (playedSeconds) {
        setSeconds(playedSeconds);
      } else if (contentCategory === 'PODCAST') {
        setSeconds(playerRef.current.audioEl.currentTime);
      }
    },
    [setSeconds, playerRef, contentCategory],
  );

  const handlers = { handlePause, handleSeek, handleProgress };

  return (
    <div style={{ flexDirection: 'space-between', flex: 1 }}>
      <MediaPlayer
        handlers={handlers}
        playerRef={playerRef}
        contentCategory={contentCategory}
        url={url}
      />
      <ExcerptMaker
        seconds={seconds}
        seekTo={seekTo}
        contentId={contentId}
        handlePause={handlePause}
      />
    </div>
  );
};

export default ContentMediaCard;
