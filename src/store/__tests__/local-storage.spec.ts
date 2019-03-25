import { loadStateFromLocalStorage, saveStateToLocalStorage } from 'store/local-storage';
import { StoreType } from 'store/store';

describe('local-storage', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'log').mockImplementation();
    jest.resetAllMocks();
    localStorage.clear();
  });
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('loadStateFromLocalStorage', () => {
    it('should return undefined if the state is not in the local storage', () => {
      localStorage.setItem('fake-state', 'not-serializable-data');
      expect(loadStateFromLocalStorage()).toBeUndefined();
    });

    it('should return the serialized data if present', () => {
      localStorage.setItem('state', '{ "test": "serializable-data" }');
      expect(loadStateFromLocalStorage()).toEqual({ test: 'serializable-data' });
    });

    it('should return undefined if the preset data is not serializable', () => {
      localStorage.setItem('state', 'not-serializable-data');
      expect(loadStateFromLocalStorage()).toBeUndefined();
    });
  });

  describe('saveStateToLocalStorage', () => {
    const initialState: StoreType = {
      dictionaries: [], products: [], colors: [], selectedDictionary: null,
    };

    it('should save the state', () => {
      expect(localStorage.getItem('state')).toBeNull();
      saveStateToLocalStorage(initialState);
      expect(JSON.parse(localStorage.getItem('state') as string)).toEqual(initialState);
    });

    it('should update the state', () => {
      expect(localStorage.getItem('state')).toBeNull();
      saveStateToLocalStorage(initialState);
      expect(JSON.parse(localStorage.getItem('state') as string)).toEqual(initialState);
      const newState: StoreType = {
        dictionaries: [{ id: 1, from: 'from', to: 1 }],
        products: [{
          id: 1, name: 'product', price: 123, dictionary: 1,
        }],
        colors: [{ id: 1, name: 'color' }],
        selectedDictionary: null,
      };
      saveStateToLocalStorage(newState);
      expect(JSON.parse(localStorage.getItem('state') as string)).toEqual(newState);
    });
  });
});
