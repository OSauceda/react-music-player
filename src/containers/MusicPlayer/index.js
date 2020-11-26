import { useState, useRef } from 'react';
import Styles from './MusicPlayer.module.scss';

const MusicPlayer = (props) => {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const audioRef = useRef(null);
  const playheadRef = useRef(null);
  const timelineRef = useRef(null);

  const onChangePlayButton = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }

  }

  const onTimeUpdateHandler = (e) => {
    const { currentTime, duration } = e.target;
    const timelineWidth = timelineRef.current.offsetWidth - playheadRef.current.offsetWidth;
    const playPercentage = timelineWidth * (currentTime/duration);

    playheadRef.current.style.marginLeft = `${playPercentage}px`;

    if (currentTime === duration) {
      setIsPlaying(false);
    }
  }

  const updatePlayheadPosition = (event) => {
    const updatedPlayheadMargin = event.clientX - getPosition(timelineRef.current);
    const timelineWidth = timelineRef.current.offsetWidth - playheadRef.current.offsetWidth;

    if (updatedPlayheadMargin >= 0 && updatedPlayheadMargin <= timelineWidth) {
      playheadRef.current.style.marginLeft = `${updatedPlayheadMargin}px`;
    }
    if (updatedPlayheadMargin < 0) {
      playheadRef.current.style.marginLeft = '0px';
    }
    if (updatedPlayheadMargin > timelineWidth) {
      playheadRef.current.style.marginLeft = `${timelineWidth}px`;
    }
  }

  const clickPercentage = (event) => {
    const timelineWidth = timelineRef.current.offsetWidth - playheadRef.current.offsetWidth;
    const timelinePosition = getPosition(timelineRef.current);

    return (event.clientX - timelinePosition) / timelineWidth;
  }

  const getPosition = (element) => element.getBoundingClientRect().left;

  const timelineOnClickHandler = (event) => {
    updatePlayheadPosition(event);
    audioRef.current.currentTime = audioRef.current.duration * clickPercentage(event);
  }

  return (
    <div className={ Styles.musicPlayerPanel }>
      <audio
        ref={ audioRef }
        onTimeUpdate={ onTimeUpdateHandler }
      >
        <source src="https://www.w3schools.com/tags/horse.mp3" type="audio/mpeg" />
      </audio>
      <div className={ Styles.audioplayer }>
        <button
          className={`${Styles.playButton} ${isPlaying && `${Styles.pause}`}`}
          id="play-button"
          onClick={ onChangePlayButton }
        />
        <div ref={ timelineRef } onClick={timelineOnClickHandler} className={ Styles.timeline }>
          <button ref={ playheadRef } className={ Styles.playhead } />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
