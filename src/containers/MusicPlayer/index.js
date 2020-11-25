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

  return (
    <div className={ Styles.musicPlayerPanel }>
      <audio
        ref={ audioRef }
        onTimeUpdate={ onTimeUpdateHandler }
      >
        <source src="https://www.w3schools.com/tags/horse.ogg" type="audio/mpeg" />
      </audio>
      <div className={ Styles.audioplayer }>
        <button
          className={`${Styles.playButton} ${isPlaying && `${Styles.pause}`}`}
          id="play-button"
          onClick={ onChangePlayButton }
        />
        <div ref={ timelineRef } className={ Styles.timeline }>
          <button ref={ playheadRef } className={ Styles.playhead } />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
