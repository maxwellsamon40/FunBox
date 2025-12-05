export interface Note {
  pitch: number;
  startTime: number;
  duration: number;
  velocity: number;
}

export interface Track {
  id: string;
  name: string;
  notes: Note[];
  volume: number;
  muted: boolean;
  soloMode: boolean;
}

export interface Project {
  id: string;
  name: string;
  bpm: number;
  tracks: Track[];
  currentTime: number;
}