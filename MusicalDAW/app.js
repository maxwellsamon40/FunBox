const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const OCTAVES = [6, 5, 4, 3, 2, 1];

let audioContext;
let synth;
let transport;
let isPlaying = false;
let tracks = [];
let currentTrackId = 0;

class Track {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.notes = new Map();
        this.volume = 1;
        this.muted = false;
    }
}

async function initAudio() {
    if (!synth) {
        await Tone.start();
        synth = new Tone.Synth({
            oscillator: { type: 'triangle' },
            envelope: {
                attack: 0.005,
                decay: 0.1,
                sustain: 0.3,
                release: 1,
            },
        }).toDestination();
    }
}

function initPiano() {
    const pianoKeys = document.getElementById('pianoKeys');
    pianoKeys.innerHTML = '';

    OCTAVES.forEach(octave => {
        NOTES.forEach(note => {
            const btn = document.createElement('button');
            const frequency = Tone.Frequency(note + octave).toFrequency();
            btn.className = `piano-key ${note.includes('#') ? 'black' : 'white'}`;
            btn.textContent = `${note}${octave}`;
            btn.dataset.note = `${note}${octave}`;
            btn.dataset.frequency = frequency;

            btn.addEventListener('mousedown', async () => {
                await initAudio();
                synth.frequency.rampTo(frequency, 0.1);
                synth.triggerAttack();
                btn.classList.add('active');
            });

            btn.addEventListener('mouseup', () => {
                synth.triggerRelease();
                btn.classList.remove('active');
            });

            btn.addEventListener('mouseleave', () => {
                synth.triggerRelease();
                btn.classList.remove('active');
            });

            pianoKeys.appendChild(btn);
        });
    });
}

function initTimeline() {
    const timelineGrid = document.getElementById('timelineGrid');
    timelineGrid.innerHTML = '';

    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.className = 'timeline-cell';
        cell.dataset.time = i;

        cell.addEventListener('click', () => {
            cell.classList.toggle('active');
        });

        timelineGrid.appendChild(cell);
    }
}

function addTrack() {
    const track = new Track(currentTrackId++, `Track ${tracks.length + 1}`);
    tracks.push(track);
    renderMixer();
}

function renderMixer() {
    const mixerTracks = document.getElementById('mixerTracks');
    mixerTracks.innerHTML = '';

    tracks.forEach(track => {
        const channelDiv = document.createElement('div');
        channelDiv.className = 'mixer-channel';

        channelDiv.innerHTML = `
            <div class="channel-name">${track.name}</div>
            <div class="channel-controls">
                <div class="fader">
                    <label>Volume</label>
                    <input type="range" min="0" max="100" value="${track.volume * 100}" class="fader-slider">
                </div>
                <button class="delete-btn">🗑 Deletar</button>
            </div>
        `;

        const volumeSlider = channelDiv.querySelector('.fader-slider');
        volumeSlider.addEventListener('input', (e) => {
            track.volume = e.target.value / 100;
        });

        const deleteBtn = channelDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            tracks = tracks.filter(t => t.id !== track.id);
            renderMixer();
        });

        mixerTracks.appendChild(channelDiv);
    });
}

async function togglePlayback() {
    await initAudio();
    if (isPlaying) {
        Tone.Transport.stop();
        isPlaying = false;
        document.getElementById('playBtn').textContent = '▶ Tocar';
    } else {
        Tone.Transport.start();
        isPlaying = true;
        document.getElementById('playBtn').textContent = '⏸ Pausar';
    }
}

function updateBPM(bpm) {
    Tone.Transport.bpm.value = bpm;
}

// Event Listeners
document.getElementById('playBtn').addEventListener('click', togglePlayback);
document.getElementById('stopBtn').addEventListener('click', async () => {
    await initAudio();
    Tone.Transport.stop();
    Tone.Transport.cancel();
    isPlaying = false;
    document.getElementById('playBtn').textContent = '▶ Tocar';
});

document.getElementById('bpmInput').addEventListener('change', (e) => {
    updateBPM(e.target.value);
});

document.getElementById('addTrackBtn').addEventListener('click', addTrack);

// Inicializar
window.addEventListener('load', () => {
    initPiano();
    initTimeline();
    addTrack();
    updateBPM(120);
});