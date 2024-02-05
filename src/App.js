import  './App.css';
import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

const AudioPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(storedPlaylist);

    const lastPlayedTrackIndex = parseInt(localStorage.getItem('lastPlayedTrackIndex'), 10) || 0;
    setCurrentTrackIndex(lastPlayedTrackIndex);
  }, []);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('lastPlayedTrackIndex', currentTrackIndex);
  }, [playlist, currentTrackIndex]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const newPlaylist = [...playlist, file];
    setPlaylist(newPlaylist);
  };

  const handlePlaylistItemClick = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleEnded = () => {
    const nextTrackIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextTrackIndex);
  };

  return (
    <>
    <div className='ml-auto'>
    <h1 className='heading'>MY AUDIO PLAYER</h1>
    </div>
    <div className="container box">
      <input type="file" accept=".mp3" onChange={handleFileChange} />
      {playlist.length > 0 && (
        <div className='card p-4 border border-danger rounded-50 border-4 bg-secondary mt-4'>
          <h2 className='playlist-heading'>Now Playing</h2>
          <ReactPlayer
            ref={playerRef}
            url={URL.createObjectURL(playlist[currentTrackIndex])}
            controls
            playing
            onEnded={handleEnded}
          />
          <h2 className='playlist-heading'>Playlist</h2>
          <div className='border p-2 border-danger'>
            {playlist.map((track, index) => (
              <div className=''  key={index} onClick={() => handlePlaylistItemClick(index)}>
                {track.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <AudioPlayer />
    </div>
  );
}
  export default App;