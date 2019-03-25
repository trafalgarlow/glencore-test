import { DictionaryAction, DictionaryActionType } from './dictionaries.actions';
import { Dictionary } from './dictionary';


const selectDictionaryReducer = (state: Dictionary | null = null, action: DictionaryAction): Dictionary | null => {
  switch (action.type) {
    case DictionaryActionType.SELECT:
      return action.dictionary as Dictionary;
    case DictionaryActionType.UNSELECT:
      return null;
    default:
      return state;
  }
};

export default selectDictionaryReducer;
