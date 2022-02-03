import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { playAudio } from '../../util';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  timeUpdateHandler,
  songs,
  setCurrentSongs,
  setSongs
}) => {

  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true
        }
      } else {
        return {
          ...song,
          active: false
        }
      }
    });
    setSongs(newSongs);
  }, [currentSong])

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    )
  }

  const drawHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
  }

  const skipTrackHangler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    console.log(currentIndex);
    if (direction === 'skip-next') {
      setCurrentSongs(songs[(currentIndex + 1) % songs.length]);
      console.log(currentIndex++);
    }

    if (direction === 'skip-back') {
      if ((currentIndex - 1) < 0) {
        setCurrentSongs(songs[songs.length - 1]);
        return;
      }
      setCurrentSongs(songs[(currentIndex - 1)]);
    }
    playAudio(audioRef, isPlaying);
  }

  const trackAnim = {
    width: `${songInfo.animationPer}%`
  }

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }
  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }} className='wrapper'>
          <input
            type="range"
            max={songInfo.duration ? songInfo.duration : 0}
            min={0}
            onChange={drawHandler}
            value={songInfo.currentTime} />
          <div style={trackAnim} className='anim-wrapper'></div>
        </div>
        <p> {songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          className='skip-back'
          size='2x'
          icon={faAngleLeft}
          onClick={() => skipTrackHangler('skip-back')}
        />
        <FontAwesomeIcon className='play' onClick={playSongHandler} size='2x' icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon
          className='skip-next'
          size='2x'
          icon={faAngleRight}
          onClick={() => skipTrackHangler('skip-next')}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default Player;
