import { ArrayUtils } from 'utils';
import { DictionaryAction, DictionaryActionType } from './dictionaries.actions';
import { Dictionary } from './dictionary';


const dictionariesReducer = (state: Dictionary[] = [], action: DictionaryAction): Dictionary[] => {
  switch (action.type) {
    case DictionaryActionType.ADD:
      return state.concat({ ...action.dictionary, id: ArrayUtils.findNextId(state) });
    case DictionaryActionType.REMOVE:
      return state.filter(({ id }) => id !== (action.dictionary as Dictionary).id);
    case DictionaryActionType.UPDATE: {
      const updatedDictionary = action.dictionary as Dictionary;
      return state.map(
        dictionary => (dictionary.id === updatedDictionary.id ? updatedDictionary : dictionary),
      );
    }
    default:
      return state;
  }
};

export default dictionariesReducer;
