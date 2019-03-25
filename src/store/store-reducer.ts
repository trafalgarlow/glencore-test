/* istanbul ignore file */

import { combineReducers } from 'redux';
import { productsReducer } from 'features/products';
import { dictionariesReducer, selectDictionaryReducer } from 'features/dictionaries';
import { colorsReducer } from 'features/colors';


const storeReducer = combineReducers({
  products: productsReducer,
  dictionaries: dictionariesReducer,
  colors: colorsReducer,
  selectedDictionary: selectDictionaryReducer,
});

export default storeReducer;
