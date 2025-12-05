import { create } from 'zustand';
import { Project, Track, Note } from '../types/audio';

interface AudioStore {
  project: Project;
  isPlaying: boolean;
  selectedTrack: string | null;
  bpm: number;
  updateBPM: (bpm: number) => void;
  addTrack: (track: Track) => void;
  addNote: (trackId: string, note: Note) => void;
  togglePlayback: () => void;
  setSelectedTrack: (trackId: string) => void;
}

export const useAudioStore = create<AudioStore>((set) => ({
  project: {
    id: '1',
    name: 'Novo Projeto',
    bpm: 120,
    tracks: [],
    currentTime: 0,
  },
  isPlaying: false,
  selectedTrack: null,
  bpm: 120,
  updateBPM: (bpm) => set({ bpm }),
  addTrack: (track) =>
    set((state) => ({
      project: {
        ...state.project,
        tracks: [...state.project.tracks, track],
      },
    })),
  addNote: (trackId, note) =>
    set((state) => ({
      project: {
        ...state.project,
        tracks: state.project.tracks.map((track) =>
          track.id === trackId
            ? { ...track, notes: [...track.notes, note] }
            : track
        ),
      },
    })),
  togglePlayback: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSelectedTrack: (trackId) => set({ selectedTrack: trackId }),
}));