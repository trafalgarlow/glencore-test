/* istanbul ignore file */

import { Context, createContext } from 'react';
import { Dictionary } from 'features/dictionaries/dictionary';
import { Color } from 'features/colors/color';
import { Product } from '../product';
import { AddProductActionType } from '../products.actions';

export interface ProductsContextValues {
  products: Product[];
  addProduct: AddProductActionType;
  getProductDictionary: (dictionaryId: number) => Dictionary;
  getProductColor: (dictionaryId: number) => Color;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const defaultContext: ProductsContextValues = { products: [] } as any;
/* eslint-enable @typescript-eslint/no-explicit-any */
const ProductsContext: Context<ProductsContextValues> = createContext<ProductsContextValues>(defaultContext);

export default ProductsContext;
