import React from 'react';
import Librarysong from './LibrarySong/LibrarySong';

const Library = ({ songs, setCurrentSongs }) => {
  return (
    <div className='library'>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => (
          <Librarysong
            songs={songs}
            song={song}
            setCurrentSongs={setCurrentSongs}
            key={song.id}
            id={song.id} />
        ))}
      </div>
    </div>
  );
}

export default Library;
