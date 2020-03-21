import React from 'react';

import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';

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

export default MediaPlayer;
