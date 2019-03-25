import { Omit } from 'utility-types';

export interface Dictionary {
  id: number;
  from: string;
  to: number;
}

export type DictionaryToInsert = Omit<Dictionary, 'id'>;
