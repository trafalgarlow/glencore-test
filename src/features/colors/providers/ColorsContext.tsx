/* istanbul ignore file */

import { Context, createContext } from 'react';
import { Color } from '../color';
import { AddColorActionType } from '../colors.actions';

export interface ColorsContextValues {
  colors: Color[];
  addColor: AddColorActionType;
  getColorById: (id: number) => Color;
  isColorNameNotAvailable: (name: string) => boolean;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const defaultContext: ColorsContextValues = { colors: [] } as any;
/* eslint-enable @typescript-eslint/no-explicit-any */

const ColorsContext: Context<ColorsContextValues> = createContext<ColorsContextValues>(defaultContext);

export default ColorsContext;
