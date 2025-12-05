import React, { useState } from 'react';
import '../../styles/pianoroll.css';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const OCTAVES = [1, 2, 3, 4, 5, 6];

export const PianoRoll: React.FC = () => {
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const handleNoteClick = (note: string, octave: number) => {
    const key = `${note}${octave}`;
    setSelectedNotes((prev) =>
      prev.includes(key) ? prev.filter((n) => n !== key) : [...prev, key]
    );
  };

  return (
    <div className="piano-roll">
      <div className="piano-keys">
        {OCTAVES.map((octave) =>
          NOTES.map((note) => (
            <button
              key={`${note}${octave}`}
              className={`piano-key ${note.includes('#') ? 'black' : 'white'}`}
              onClick={() => handleNoteClick(note, octave)}
            >
              {note}{octave}
            </button>
          ))
        )}
      </div>
      <div className="timeline-grid">
        {/* Grid para adicionar notas */}
      </div>
    </div>
  );
};