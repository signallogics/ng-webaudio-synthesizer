import { Observable, Subject, Subscription } from 'rxjs';
import {
  SynthMessage, SynthNoteMessage, SynthNoteOff, SynthNoteOn, VolumeChange,
  WaveformChange
} from '../models/synth-note-message';
export class MidiNote {

  private notes: Note[];

  constructor(private synthStream$: Subject<SynthNoteMessage>,
              private audioContext: any,
              private audioBus: AudioNode) {
    this.notes = [
      new Note(['C0'], 16.3516, synthStream$, audioContext, audioBus),
      new Note(['C#0', 'Db0'], 17.3239, synthStream$, audioContext, audioBus),
      new Note(['D0'], 18.3540, synthStream$, audioContext, audioBus),
      new Note(['D#0', 'Eb0'], 19.4454, synthStream$, audioContext, audioBus),
      new Note(['E0'], 20.6017, synthStream$, audioContext, audioBus),
      new Note(['F0'], 21.8268, synthStream$, audioContext, audioBus),
      new Note(['F#0', 'Gb0'], 23.1247, synthStream$, audioContext, audioBus),
      new Note(['G0'], 24.4997, synthStream$, audioContext, audioBus),
      new Note(['G#0', 'Ab0'], 25.9565, synthStream$, audioContext, audioBus),
      new Note(['A0'], 27.5000, synthStream$, audioContext, audioBus),
      new Note(['A#0', 'Bb0'], 29.1352, synthStream$, audioContext, audioBus),
      new Note(['B0'], 30.8677, synthStream$, audioContext, audioBus),
      new Note(['C1'], 32.7032, synthStream$, audioContext, audioBus),
      new Note(['C#1', 'Db1'], 34.6478, synthStream$, audioContext, audioBus),
      new Note(['D1'], 36.7081, synthStream$, audioContext, audioBus),
      new Note(['D#1', 'Eb1'], 38.8909, synthStream$, audioContext, audioBus),
      new Note(['E1'], 41.2034, synthStream$, audioContext, audioBus),
      new Note(['F1'], 43.6535, synthStream$, audioContext, audioBus),
      new Note(['F#1', 'Gb1'], 46.25, synthStream$, audioContext, audioBus),
      new Note(['G1'], 48.8884, synthStream$, audioContext, audioBus),
      new Note(['G#1', 'Ab1'], 51.9131, synthStream$, audioContext, audioBus),
      new Note(['A1'], 55.00, synthStream$, audioContext, audioBus),
      new Note(['A#1', 'Bb1'], 58.2705, synthStream$, audioContext, audioBus),
      new Note(['B1'], 61.7354, synthStream$, audioContext, audioBus),
      new Note(['C2'], 65.4064, synthStream$, audioContext, audioBus),
      new Note(['C#2', 'Db2'], 69.2957, synthStream$, audioContext, audioBus),
      new Note(['D2'], 73.4162, synthStream$, audioContext, audioBus),
      new Note(['D#2', 'Eb2'], 77.7817, synthStream$, audioContext, audioBus),
      new Note(['E2'], 82.4069, synthStream$, audioContext, audioBus),
      new Note(['F2'], 87.3071, synthStream$, audioContext, audioBus),
      new Note(['F#2', 'Gb2'], 92.4986, synthStream$, audioContext, audioBus),
      new Note(['G2'], 97.9989, synthStream$, audioContext, audioBus),
      new Note(['G#2', 'Ab2'], 103.826, synthStream$, audioContext, audioBus),
      new Note(['A2'], 110.00, synthStream$, audioContext, audioBus),
      new Note(['A#2', 'Bb2'], 116.541, synthStream$, audioContext, audioBus),
      new Note(['B2'], 123.471, synthStream$, audioContext, audioBus),
      new Note(['C3'], 130.813, synthStream$, audioContext, audioBus),
      new Note(['C#3', 'Db3'], 138.591, synthStream$, audioContext, audioBus),
      new Note(['D3'], 146.832, synthStream$, audioContext, audioBus),
      new Note(['D#3', 'Eb3'], 155.563, synthStream$, audioContext, audioBus),
      new Note(['E3'], 164.814, synthStream$, audioContext, audioBus),
      new Note(['F3'], 174.614, synthStream$, audioContext, audioBus),
      new Note(['F#3', 'Gb3'], 184.997, synthStream$, audioContext, audioBus),
      new Note(['G3'], 195.998, synthStream$, audioContext, audioBus),
      new Note(['G#3', 'Ab3'], 207.652, synthStream$, audioContext, audioBus),
      new Note(['A3'], 220.00, synthStream$, audioContext, audioBus),
      new Note(['A#3', 'Bb3'], 233.082, synthStream$, audioContext, audioBus),
      new Note(['B3'], 246.942, synthStream$, audioContext, audioBus),
      new Note(['C4'], 261.626, synthStream$, audioContext, audioBus),
      new Note(['C#4', 'Db4'], 277.183, synthStream$, audioContext, audioBus),
      new Note(['D4'], 293.665, synthStream$, audioContext, audioBus),
      new Note(['D#4', 'Eb4'], 311.127, synthStream$, audioContext, audioBus),
      new Note(['E4'], 329.628, synthStream$, audioContext, audioBus),
      new Note(['F4'], 349.228, synthStream$, audioContext, audioBus),
      new Note(['F#4', 'Gb4'], 369.994, synthStream$, audioContext, audioBus),
      new Note(['G4'], 391.995, synthStream$, audioContext, audioBus),
      new Note(['G#4', 'Ab4'], 415.305, synthStream$, audioContext, audioBus),
      new Note(['A4'], 440.00, synthStream$, audioContext, audioBus),
      new Note(['A#4', 'Bb4'], 466.164, synthStream$, audioContext, audioBus),
      new Note(['B4'], 493.883, synthStream$, audioContext, audioBus),
      new Note(['C5'], 523.251, synthStream$, audioContext, audioBus),
      new Note(['C#5', 'Db5'], 554.365, synthStream$, audioContext, audioBus),
      new Note(['D5'], 587.330, synthStream$, audioContext, audioBus),
      new Note(['D#5', 'Eb5'], 622.254, synthStream$, audioContext, audioBus),
      new Note(['E5'], 659.255, synthStream$, audioContext, audioBus),
      new Note(['F5'], 698.456, synthStream$, audioContext, audioBus),
      new Note(['F#5', 'Gb5'], 739.989, synthStream$, audioContext, audioBus),
      new Note(['G5'], 783.991, synthStream$, audioContext, audioBus),
      new Note(['G#5', 'Ab5'], 830.609, synthStream$, audioContext, audioBus),
      new Note(['A5'], 880.00, synthStream$, audioContext, audioBus),
      new Note(['A#5', 'Bb5'], 932.328, synthStream$, audioContext, audioBus),
      new Note(['B5'], 987.767, synthStream$, audioContext, audioBus),
      new Note(['C6'], 1046.50, synthStream$, audioContext, audioBus),
      new Note(['C#6', 'Db6'], 1108.73, synthStream$, audioContext, audioBus),
      new Note(['D6'], 1174.66, synthStream$, audioContext, audioBus),
      new Note(['D#6', 'Eb6'], 1244.51, synthStream$, audioContext, audioBus),
      new Note(['E6'], 1318.51, synthStream$, audioContext, audioBus),
      new Note(['F6'], 1396.91, synthStream$, audioContext, audioBus),
      new Note(['F#6', 'Gb6'], 1479.98, synthStream$, audioContext, audioBus),
      new Note(['G6'], 1567.98, synthStream$, audioContext, audioBus),
      new Note(['G#6', 'Ab6'], 1661.22, synthStream$, audioContext, audioBus),
      new Note(['A6'], 1760.00, synthStream$, audioContext, audioBus),
      new Note(['A#6', 'Bb6'], 1864.66, synthStream$, audioContext, audioBus),
      new Note(['B6'], 1975.53, synthStream$, audioContext, audioBus),
      new Note(['C7'], 2093.00, synthStream$, audioContext, audioBus),
      new Note(['C#7', 'Db7'], 2217.46, synthStream$, audioContext, audioBus),
      new Note(['D7'], 2349.32, synthStream$, audioContext, audioBus),
      new Note(['D#7', 'Eb7'], 2489.02, synthStream$, audioContext, audioBus),
      new Note(['E7'], 2637.02, synthStream$, audioContext, audioBus),
      new Note(['F7'], 2793.83, synthStream$, audioContext, audioBus),
      new Note(['F#7', 'Gb7'], 2959.96, synthStream$, audioContext, audioBus),
      new Note(['G7'], 3135.96, synthStream$, audioContext, audioBus),
      new Note(['G#7', 'Ab7'], 3322.44, synthStream$, audioContext, audioBus),
      new Note(['A7'], 3520.00, synthStream$, audioContext, audioBus),
      new Note(['A#7', 'Bb7'], 3729.31, synthStream$, audioContext, audioBus),
      new Note(['B7'], 3951.07, synthStream$, audioContext, audioBus),
      new Note(['C8'], 4186.01, synthStream$, audioContext, audioBus),
      new Note(['C#8', 'Db8'], 4434.92, synthStream$, audioContext, audioBus),
      new Note(['D8'], 4698.64, synthStream$, audioContext, audioBus),
      new Note(['D#8', 'Eb8'], 4978.03, synthStream$, audioContext, audioBus),
      new Note(['E8'], 5274.041, synthStream$, audioContext, audioBus),
      new Note(['F8'], 5587.652, synthStream$, audioContext, audioBus)
    ];
 }
}

export enum NoteState { PLAYING, STOPPED }

export class Note {
  private static midiNoteNumberCtr = 0;

  private stopWatcher$: Subject<void> = new Subject<void>();
  private subscriptions: Subscription[] = [];
  private state: NoteState = NoteState.STOPPED;

  // for any notes that are fired, here's the message to stop them
  private midiNoteNumber: number;
  private waveform = 'sine';
  private gainNode: GainNode;
  private volume = 0.2;

  // tone curve
  private attack = 0;
  private sustain = 0.3;
  private decay = 0.1;
  private release = 0.1;

  constructor(public noteValues: string[],
              private frequency: number,
              private synthStream$: Subject<SynthNoteMessage>,
              private audioContext: AudioContext,
              private audioBus: AudioNode) {
    // hackity - instead of adding to constructor, assume we construct in
    // 88 key order properly
    this.midiNoteNumber = Note.midiNoteNumberCtr;
    Note.midiNoteNumberCtr = Note.midiNoteNumberCtr + 1;
    this.gainNode = audioContext.createGain();
    this.gainNode.gain.value = this.volume;
    this.gainNode.connect(audioBus);

    this.subscriptions.push(synthStream$
      .filter((message: SynthMessage) =>
         message instanceof SynthNoteOn &&
         (<SynthNoteOn>message).note === this.midiNoteNumber ||
          this.noteValues.indexOf(<string>((<SynthNoteOn>message).note)) > -1)
      .subscribe((message: SynthNoteOn) => {
          console.log(`starting MIDI NOTE ${message.note}`);
          this.noteOn(); }));

    this.subscriptions.push(synthStream$
      .filter((message: SynthMessage) => message instanceof WaveformChange)
      .subscribe((message: WaveformChange) => {
        this.waveform = message.waveForm;
    }));
  }

  noteOn() {
    setTimeout(() => {
      const now = this.audioContext.currentTime;
      new ToneWorker(this.audioContext, this.frequency, this.waveform, now,
        this.volume, this.attack, this.sustain, this.decay, this.audioBus, this.stopWatcher$);

      // subscribe to note off and stop oscillation
      this.synthStream$.filter((message: SynthMessage) =>
        message instanceof SynthNoteOff &&
        (<SynthNoteOff>message).note === this.midiNoteNumber ||
        this.noteValues.indexOf(<string>((<SynthNoteOff>message).note)) > -1)
        .subscribe((message: SynthNoteOff) => {
          console.log(`stopping MIDI NOTES for ${message.note}`);
          this.stopWatcher$.next();
        });
    }, 0);
  }
}

class ToneWorker {
  constructor(context: AudioContext,
              frequency: number,
              waveform: string,
              startTime: number,
              volume: number,
              attack: number,
              sustain: number,
              decay: number,
              outputBus: AudioNode,
              private stopWatcher$: Observable<void>) {
    const oscillator: OscillatorNode = context.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.type = waveform;

    const gainNode: GainNode = context.createGain();
    gainNode.gain.value = 0.2;
    gainNode.connect(outputBus);
    oscillator.connect(gainNode);
    oscillator.frequency.value = frequency;
    oscillator.start(0);
    // attack
    gainNode.gain.linearRampToValueAtTime(volume, startTime + attack);
    gainNode.gain.setTargetAtTime(volume / 2, startTime + attack + sustain, 0.5);

    const subscription: Subscription = stopWatcher$.subscribe(() => {
      const now = context.currentTime;
      gainNode.gain.cancelScheduledValues(0);
      gainNode.gain.setTargetAtTime(0, now + decay, 0.5);
      subscription.unsubscribe();
    });
  }
}
