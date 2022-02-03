import React from 'react';
import { playAudio } from '../../../util';

const Librarysong = ({ song, setCurrentSongs, id, songs, audioRef, isPlaying, setSongs }) => {
  const songSelectHandler = () => {
    const selectSong = songs.filter((state) => state.id === id);
    setCurrentSongs(selectSong[0]);

    const newSongs = songs.map((song) => {
      if (song.id === id) {
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

    playAudio(audioRef, isPlaying);

    audioRef.current.play();
  }

  return (
    <div className={`library-song ${song.active ? 'selected' : ''} `} onClick={songSelectHandler}>
      <img src={song.cover} alt={song.name} />
      <div className='song-desc'>
        <h2>{song.name}</h2>
        <h3> {song.artist}</h3>
      </div>
    </div>
  );
}

export default Librarysong;
