/* istanbul ignore file */

import { Context, createContext } from 'react';
import { Color } from 'features/colors/color';
import { Product } from 'features/products/product';
import { Dictionary } from '../dictionary';
import { AddDictionaryActionType, GenericDictionaryActionType } from '../dictionaries.actions';

interface DictionariesContextActionValues {
  addDictionary: AddDictionaryActionType;
  removeDictionary: GenericDictionaryActionType;
  updateDictionary: GenericDictionaryActionType;
  selectDictionary: GenericDictionaryActionType;
  unselectDictionary: GenericDictionaryActionType;
}

export interface DictionariesContextValues extends DictionariesContextActionValues{
  dictionaries: Dictionary[];
  selectedDictionary: Dictionary | null;
  isFromAvailable: (from: string, ownId?: number) => boolean;
  getAssociatedProducts: (dictionaryId: number) => Product[];
  getDictionaryColor: (colorId: number) => Color;
  getDictionaryById: (dictionaryId: number) => Dictionary;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const defaultContext: DictionariesContextValues = {
  dictionaries: [],
  selectedDictionary: null,
} as any;
/* eslint-enable @typescript-eslint/no-explicit-any */
const DictionariesContext: Context<DictionariesContextValues> = createContext<DictionariesContextValues>(defaultContext);

export default DictionariesContext;
