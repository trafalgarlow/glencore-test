/* eslint-disable no-console */

import { StoreType } from './store';


const loadStateFromLocalStorage = (): StoreType | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Error loading state from the local storage', err);
    return undefined;
  }
};

const saveStateToLocalStorage = (state: StoreType): void => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
  console.log('New state saved in locale storage');
};

export { loadStateFromLocalStorage, saveStateToLocalStorage };
