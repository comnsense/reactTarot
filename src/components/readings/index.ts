import { Reading } from '../../types';
import { baseReadings } from './baseReadings';
import { minorArcanaReadings } from './MinorArcanaReadings';

// Комбинираме всички комбинации
export const readings: Reading[] = [
  ...baseReadings,
  ...minorArcanaReadings,
];

// Експортваме и категориите за филтриране
export const readingsByCategory = {
  all: readings,
  major: baseReadings,
  minor: minorArcanaReadings,
};

// Експортваме отделните файлове за по-детайлно филтриране
export { baseReadings } from './baseReadings';
export { minorArcanaReadings } from './MinorArcanaReadings';
