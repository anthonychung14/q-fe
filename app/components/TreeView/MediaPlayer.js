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
  startPosition,
  type,
}) => {
  React.useEffect(
    () => {
      if (type === 'excerpt' && playerRef.current && startPosition) {
        playerRef.current.audioEl.currentTime = startPosition;
      }
    },
    [playerRef, startPosition, type],
  );

  return (
    <div style={{ textAlign: 'center', padding: '8%' }}>
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

const MediaPlayer = ({
  contentCategory,
  contentMedium,
  handlers,
  ...props
}) => {
  if (contentCategory === 'PODCAST' || contentMedium === 'AUDIO') {
    return <AudioPlayer {...handlers} {...props} />;
  }
  return <YouTubePlayer {...handlers} {...props} />;
};

export default MediaPlayer;
/**
       <Slider
        style={{ marginLeft: 30, marginRight: 30 }}
        defaultValue={26}
        min={0}
        max={30}
        onChange={}
        onAfterChange={}
      /> 
  
 */
