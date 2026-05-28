export interface Track {
  number: number;
  title: string;
  durationSeconds: number;
}

export interface Record {
  id: string;
  slug: string;
  artist: string;
  title: string;
  label: string;
  releaseYear: number;
  genre: 'post-punk' | 'folk' | 'ambient' | 'indie-rock' | 'synth-pop';
  format: '12" LP' | '7" Single';
  priceUsd: number;
  inStock: boolean;
  coverAccent: string;
  coverInk: string;
  blurb: string;
  tracks: Track[];
}

export const records: Record[] = [
  {
    id: 'rec-001',
    slug: 'cold-static',
    artist: 'Hollow North',
    title: 'Cold Static',
    label: 'Wax & Wane Records',
    releaseYear: 2024,
    genre: 'post-punk',
    format: '12" LP',
    priceUsd: 28,
    inStock: false,
    coverAccent: '#3B5778',
    coverInk: '#E8EEF6',
    blurb:
      'Four-piece from a coastal town that mostly rains. Tape hiss as instrument. Recorded in a converted boathouse over one cold week in March.',
    tracks: [
      { number: 1, title: 'Salt Glass', durationSeconds: 218 },
      { number: 2, title: 'Lighthouse Keeper', durationSeconds: 187 },
      { number: 3, title: 'North Atlantic', durationSeconds: 254 },
      { number: 4, title: 'Cold Static', durationSeconds: 312 },
      { number: 5, title: 'Year Without Summer', durationSeconds: 196 },
      { number: 6, title: 'Mooring Lines', durationSeconds: 241 },
    ],
  },
  {
    id: 'rec-002',
    slug: 'mirror-year',
    artist: 'Lake Verena',
    title: 'Mirror Year',
    label: 'Slow Light',
    releaseYear: 2023,
    genre: 'folk',
    format: '12" LP',
    priceUsd: 24,
    inStock: true,
    coverAccent: '#A8B89B',
    coverInk: '#2E3023',
    blurb:
      'Solo project, mostly acoustic, occasionally with a string trio. Recorded live to a single ribbon microphone in a wooden church.',
    tracks: [
      { number: 1, title: 'Soft Day', durationSeconds: 203 },
      { number: 2, title: 'Mirror Year', durationSeconds: 285 },
      { number: 3, title: 'Pomegranate', durationSeconds: 174 },
      { number: 4, title: 'Margin Notes', durationSeconds: 232 },
      { number: 5, title: 'Late August', durationSeconds: 261 },
    ],
  },
  {
    id: 'rec-003',
    slug: 'the-long-gallery',
    artist: 'Saint Tilde',
    title: 'The Long Gallery',
    label: 'Wax & Wane Records',
    releaseYear: 2025,
    genre: 'ambient',
    format: '12" LP',
    priceUsd: 32,
    inStock: true,
    coverAccent: '#7B5E8C',
    coverInk: '#F0E8F4',
    blurb:
      'Single 38-minute composition. Modular synthesisers, field recordings from the British Museum, no edits. One side per pass.',
    tracks: [
      { number: 1, title: 'The Long Gallery (Side A)', durationSeconds: 1138 },
      { number: 2, title: 'The Long Gallery (Side B)', durationSeconds: 1142 },
    ],
  },
  {
    id: 'rec-004',
    slug: 'last-pair',
    artist: 'Quiet Method',
    title: 'Last Pair',
    label: 'Heron Tape',
    releaseYear: 2024,
    genre: 'indie-rock',
    format: '12" LP',
    priceUsd: 26,
    inStock: false,
    coverAccent: '#B8633A',
    coverInk: '#F5EAD9',
    blurb:
      'Their fourth record and the one they say they almost cancelled. Then a friend lent them a 1976 Wurlitzer and the songs arrived in ten days.',
    tracks: [
      { number: 1, title: 'Walking Track', durationSeconds: 198 },
      { number: 2, title: 'Last Pair', durationSeconds: 224 },
      { number: 3, title: 'Off-Season', durationSeconds: 247 },
      { number: 4, title: 'No Cathedral', durationSeconds: 211 },
      { number: 5, title: 'Wurlitzer', durationSeconds: 289 },
      { number: 6, title: 'Storm Glass', durationSeconds: 167 },
      { number: 7, title: 'Returnings', durationSeconds: 305 },
    ],
  },
  {
    id: 'rec-005',
    slug: 'verglas',
    artist: 'Lyselys',
    title: 'Verglas',
    label: 'Wax & Wane Records',
    releaseYear: 2025,
    genre: 'synth-pop',
    format: '12" LP',
    priceUsd: 30,
    inStock: true,
    coverAccent: '#7FB3C9',
    coverInk: '#0F2A33',
    blurb:
      'Norwegian-Danish duo, second record. Most of the percussion is sampled from melting ice. Translated, the title means "thin transparent ice".',
    tracks: [
      { number: 1, title: 'Northings', durationSeconds: 203 },
      { number: 2, title: 'Verglas', durationSeconds: 247 },
      { number: 3, title: 'Auroral', durationSeconds: 218 },
      { number: 4, title: 'Slow Thaw', durationSeconds: 292 },
      { number: 5, title: 'White Carbon', durationSeconds: 186 },
      { number: 6, title: 'Lyselys', durationSeconds: 312 },
    ],
  },
];

export function getRecord(slug: string): Record | undefined {
  return records.find((r) => r.slug === slug);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}
