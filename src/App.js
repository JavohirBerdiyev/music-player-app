import React, { useRef, useState } from 'react';
import './App.css';
import Library from './components/Library/Library';
import Nav from './components/Nav/Nav';
import Player from './components/Player/Player';
import Song from './components/Song/Song';

import data from "./data";

function App() {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSongs] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({ currentTime: 0, duration: 0, animationPer: 0 });
  const [libraryStatus, setlibraryStatus] = useState(false);


  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPer = Math.round((roundedCurrent * 100) / roundedDuration)
    setSongInfo({ ...songInfo, currentTime: current, duration, animationPer })
  }
  const style = {
    paddingLeft: "20rem"
  }

  return (
    <div className="App">
      <div style={libraryStatus ? style : null}>
        <Nav libraryStatus={libraryStatus} setlibraryStatus={setlibraryStatus} />
        <Song currentSong={currentSong} />
        <Player
          isPlaying={isPlaying}
          currentSong={currentSong}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          timeUpdateHandler={timeUpdateHandler}
          songs={songs}
          setCurrentSongs={setCurrentSongs}
          setSongs={setSongs}
        />
      </div>

      <Library
        songs={songs}
        setCurrentSongs={setCurrentSongs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
    </div>
  );
}

export default App;
