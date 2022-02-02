import React, { useState } from 'react';
import './App.css';
import Library from './components/Library/Library';
import Player from './components/Player/Player';
import Song from './components/Song/Song';

import data from "./util";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSongs] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        currentSong={currentSong}
        setIsPlaying={setIsPlaying}
      />
      <Library songs={songs} setCurrentSongs={setCurrentSongs} />
    </div>
  );
}

export default App;
