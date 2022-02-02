import React from 'react';

const Librarysong = ({ song, setCurrentSongs, id, songs }) => {
  const songSelectHandler = () => {
    const selectSong = songs.filter((state) => state.id === id);
    setCurrentSongs(selectSong[0]);
    // setCurrentSongs(song);
  }

  return (
    <div className='library-song' onClick={songSelectHandler}>
      <img src={song.cover} alt={song.name} />
      <div className='song-desc'>
        <h2>{song.name}</h2>
        <h3> {song.artist}</h3>
      </div>
    </div>
  );
}

export default Librarysong;
