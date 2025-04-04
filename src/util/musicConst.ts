const NATURALSYM = '♮';
const SHARPSYM = '♯';
const FLATSYM = '♭';
const DOUBLESHARPSYM = '𝄪';
const DOUBLEFLATSYM = '𝄫';
const accidentals = [NATURALSYM, SHARPSYM, FLATSYM];

const naturalNotes = 'CDEFGAB'.split('');

const notes: string[] = [
  'C',
  'C♯/D♭',
  'D',
  'D♯/E♭',
  'E',
  'F',
  'F♯/G♭',
  'G',
  'G♯/A♭',
  'A',
  'A♯/B♭',
  'B',
];

const notesAll = [
  'C',
  'C♯',
  'D♭',
  'D',
  'D♯',
  'E♭',
  'E',
  'F',
  'F♯',
  'G♭',
  'G',
  'G♯',
  'A♭',
  'A',
  'A♯',
  'B♭',
  'B',
  'C♭',
];

const enharmonicNotes = {
  noteC: 'B♯',
  noteE: 'F♭',
  noteF: 'E♯',
  noteB: 'C♭',
};

const theoreticalScales = {
  major: ['A♯', 'B♯', 'G♯', 'D♯', 'E♯', 'F♭'],
  minor: ['C♭', 'D♭', 'E♯', 'F♭', 'G♭'],
};

const circleOfFifthsSharpsAndFlats = {
  sharps: {
    keys: ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯'],
    notes: ['', 'F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯', 'B♯'],
  },
  flats: {
    keys: ['F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭'],
    notes: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭'],
  },
};

/*  Dim  <  Perfect <  Aug
    Dim  <  Minor  <  Major  <  Aug  */
const intervals = [
  { name: 'Root', interval: 'P1' },

  { name: 'Diminished 2nd', interval: 'd2' },
  { name: 'Minor 2nd', interval: 'm2' },
  { name: 'Major 2nd', interval: 'M2' },
  { name: 'Augmented 2nd', interval: 'A2' },

  { name: 'Diminished 3rd', interval: 'd3' },
  { name: 'Minor 3rd', interval: 'm3' },
  { name: 'Major 3rd', interval: 'M3' },
  { name: 'Augmented 3rd', interval: 'A3' },

  { name: 'Diminished 4th', interval: 'd4' },
  { name: 'Perfect 4th', interval: 'P4' },
  { name: 'Augmented 4th', interval: 'A4' },

  { name: 'Diminished 5th', interval: 'd5' },
  { name: 'Perfect 5th', interval: 'P5' },
  { name: 'Augmented 5th', interval: 'A5' },

  { name: 'Diminished 6th', interval: 'd6' },
  { name: 'Minor 6th', interval: 'm6' },
  { name: 'Major 6th', interval: 'M6' },
  { name: 'Augmented 6th', interval: 'A6' },

  { name: 'Diminished 7th', interval: 'd7' },
  { name: 'Minor 7th', interval: 'm7' },
  { name: 'Major 7th', interval: 'M7' },
  { name: 'Augmented 7th', interval: 'A7' },

  { name: 'Perfect Octave', interval: 'P8' },
];

export {
  NATURALSYM,
  SHARPSYM,
  FLATSYM,
  DOUBLESHARPSYM,
  DOUBLEFLATSYM,
  accidentals,
  naturalNotes,
  notes,
  notesAll,
  enharmonicNotes,
  theoreticalScales,
  circleOfFifthsSharpsAndFlats,
  intervals,
};
