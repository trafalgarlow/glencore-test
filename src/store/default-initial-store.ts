/* eslint-disable object-curly-newline */
/* istanbul ignore file */

import { Color } from 'features/colors/color';
import { Dictionary } from 'features/dictionaries/dictionary';
import { Product } from 'features/products/product';
import { StoreType } from './store';


const color1: Color = { id: 1, name: 'Dark Grey' };
const color2: Color = { id: 2, name: 'Black' };
const color3: Color = { id: 3, name: 'Silver' };
const colors: Color[] = [color1, color2, color3];

const dictionary1: Dictionary = { id: 1, from: 'Anthracite', to: 1 };
const dictionary2: Dictionary = { id: 2, from: 'Midnight Black', to: 2 };
const dictionary3: Dictionary = { id: 3, from: 'Mystic Silver', to: 3 };
const dictionaries: Dictionary[] = [dictionary1, dictionary2, dictionary3];

const product1: Product = { id: 1, name: 'Apple iPhone 6s', dictionary: 1, price: 769 };
const product2: Product = { id: 2, name: 'Samsung Galaxy S8', dictionary: 2, price: 569 };
const product3: Product = { id: 3, name: 'Huawei P9', dictionary: 3, price: 272 };
const products: Product[] = [product1, product2, product3];

const defaultInitialStore: StoreType = {
  products,
  dictionaries,
  colors,
  selectedDictionary: null,
};

export default defaultInitialStore;
