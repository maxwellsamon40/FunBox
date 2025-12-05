import React from 'react';
import { Volume2, Trash2 } from 'lucide-react';
import { useAudioStore } from '../../store/audioStore';
import '../../styles/mixer.css';

export const Mixer: React.FC = () => {
  const { project } = useAudioStore();

  return (
    <div className="mixer">
      <div className="mixer-header">
        <h3>Mixer</h3>
      </div>
      <div className="mixer-tracks">
        {project.tracks.map((track) => (
          <div key={track.id} className="mixer-channel">
            <div className="channel-name">{track.name}</div>
            <div className="channel-controls">
              <div className="fader">
                <Volume2 size={16} />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={track.volume * 100}
                  className="fader-slider"
                />
              </div>
              <button className="delete-btn">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};