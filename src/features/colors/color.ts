import { Omit } from 'utility-types';

export interface Color {
  id: number;
  name: string;
}

export type ColorToInsert = Omit<Color, 'id'>;
