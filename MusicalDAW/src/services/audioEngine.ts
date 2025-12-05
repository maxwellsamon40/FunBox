import * as Tone from 'tone';

export class AudioEngine {
  private synth: Tone.Synth;
  private isInitialized = false;

  constructor() {
    this.synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
      },
    }).toDestination();
  }

  async initialize() {
    if (!this.isInitialized) {
      await Tone.start();
      this.isInitialized = true;
    }
  }

  playNote(pitch: number, duration: string = '8n') {
    this.synth.triggerAttackRelease(pitch, duration);
  }

  stopAll() {
    this.synth.triggerRelease();
  }

  setBPM(bpm: number) {
    Tone.Transport.bpm.value = bpm;
  }

  startTransport() {
    Tone.Transport.start();
  }

  stopTransport() {
    Tone.Transport.stop();
  }
}

export const audioEngine = new AudioEngine();