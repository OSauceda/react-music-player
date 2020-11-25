import { useState } from 'react';
import Styles from './MusicPlayer.module.scss';

const MusicPlayer = (props) => {
  const [ isPlaying, setIsPlaying ] = useState(false);

  return (
    <div className={Styles.musicPlayerPanel}>
      <audio></audio>
      <div className={Styles.audioplayer}>
        <button id="play-button" onClick={() => setIsPlaying(!isPlaying)} className={`${Styles.playButton} ${isPlaying && `${Styles.pause}`}`} />
        <div className={Styles.timeline}>
          <button className={Styles.playhead} />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
