import { Reading } from '../../types';
import { baseReadings } from './baseReadings';
import { minorArcanaReadings } from './MinorArcanaReadings';

export const readings: Reading[] = [
  ...baseReadings,
  ...minorArcanaReadings,
];

export const readingsByCategory = {
  all: readings,
  major: baseReadings,
  minor: minorArcanaReadings,
};

export { baseReadings } from './baseReadings';
export { minorArcanaReadings } from './MinorArcanaReadings';
