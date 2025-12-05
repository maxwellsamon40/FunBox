import React, { useEffect } from 'react';
import { useAudioStore } from './store/audioStore';
import { PianoRoll } from './components/Piano/PianoRoll';
import { Mixer } from './components/Mixer/Mixer';
import { audioEngine } from './services/audioEngine';
import './App.css';

function App() {
  const { isPlaying, bpm, togglePlayback, updateBPM } = useAudioStore();

  useEffect(() => {
    audioEngine.initialize();
    audioEngine.setBPM(bpm);
  }, [bpm]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 MusicalDAW</h1>
        <div className="controls">
          <input
            type="number"
            min="60"
            max="300"
            value={bpm}
            onChange={(e) => updateBPM(parseInt(e.target.value))}
            className="bpm-input"
          />
          <span>BPM</span>
          <button
            className={`play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlayback}
          >
            {isPlaying ? '⏸ Parar' : '▶ Tocar'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <PianoRoll />
        <Mixer />
      </main>
    </div>
  );
}

export default App;