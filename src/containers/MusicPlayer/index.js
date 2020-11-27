import { useState, useRef } from 'react';
import Styles from './MusicPlayer.module.scss';

const MusicPlayer = (props) => {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const audioRef = useRef(null);
  const playheadRef = useRef(null);
  const timelineRef = useRef(null);

  /**
   * Callback used to play or pause the music when clicking the big play button
   */
  const onChangePlayButton = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  /**
   * Updates the playhead position in the timeline as the music plays
   * @param {HTML DOM Event} event
   */
  const onTimeUpdateHandler = (event) => {
    const { currentTime, duration } = event.target;
    const timelineWidth = getTimelineWidth();
    const playPercentage = timelineWidth * (currentTime/duration);

    playheadRef.current.style.marginLeft = `${playPercentage}px`;

    if (currentTime === duration) {
      setIsPlaying(false);
    }
  }

  /**
   * Updates the playhead position whenever the user clicks somewhere in the timeline
   * @param {HTML DOM Event} event
   */
  const updatePlayheadPosition = (event) => {
    const updatedPlayheadMargin = event.clientX - getElementPosition(timelineRef.current);
    const timelineWidth = getTimelineWidth();

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

  /**
   * Based on the position where the user clicked in the timeline
   * return the % relative to the timeline's total width
   * @param {HTML DOM Event} event
   */
  const clickPercentage = (event) => {
    const timelineWidth = getTimelineWidth();
    const timelinePosition = getElementPosition(timelineRef.current);

    return (event.clientX - timelinePosition) / timelineWidth;
  }

  /**
   * Callback for updating the playhead position in the timeline
   * and updating the currentTime of the track
   * @param {HTML DOM Event} event
   */
  const timelineOnClickHandler = (event) => {
    updatePlayheadPosition(event);
    audioRef.current.currentTime = audioRef.current.duration * clickPercentage(event);
  }

  /**
   * Util function to get the position of any html element
   * @param {HTML Element} element
   */
  const getElementPosition = (element) => element.getBoundingClientRect().left;

  /**
   * Util function to get the timeline html element width minus the playhead width
   */
  const getTimelineWidth = () => timelineRef.current.offsetWidth - playheadRef.current.offsetWidth;

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
        <div ref={ timelineRef } onClick={ timelineOnClickHandler } className={ Styles.timeline }>
          <button ref={ playheadRef } className={ Styles.playhead } />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
