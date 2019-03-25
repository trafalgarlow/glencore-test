/* istanbul ignore file */

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import _ from 'lodash';
import { Product } from 'features/products/product';
import { Dictionary } from 'features/dictionaries/dictionary';
import { Color } from 'features/colors/color';
import storeReducer from './store-reducer';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from './local-storage';
import defaultInitialStore from './default-initial-store';

export interface StoreType {
  products: Product[];
  dictionaries: Dictionary[];
  colors: Color[];
  selectedDictionary: Dictionary | null;
}

const initialStore: StoreType = loadStateFromLocalStorage() || defaultInitialStore;

const store = createStore(
  storeReducer,
  initialStore,
  composeWithDevTools(),
);

let latestStore: StoreType = initialStore;

store.subscribe(() => {
  const { products, dictionaries, colors } = store.getState();

  const storeState = {
    products, dictionaries, colors, selectedDictionary: null,
  };

  if (!_.isEqual(latestStore, storeState)) {
    saveStateToLocalStorage(storeState);
    latestStore = { ...storeState };
  }
});

export default store;
