import selectDictionaryReducer from '../select-dictionary.reducer';
import { Dictionary } from '../dictionary';
import { DictionaryAction, DictionaryActionType } from '../dictionaries.actions';


const dictionary: Dictionary = { id: 1, from: 'name', to: 3 };

describe('selectDictionaryReducer', () => {
  it('should return the state if the action is not matched', () => {
    const action: DictionaryAction = {
      type: ('' as DictionaryActionType),
      dictionary,
    };
    expect(selectDictionaryReducer(null, action)).toEqual(null);
  });

  it('should select the dictionary in the state', () => {
    const action: DictionaryAction = {
      type: DictionaryActionType.SELECT,
      dictionary,
    };
    expect(selectDictionaryReducer(null, action)).toEqual(dictionary);
  });

  it('should unselect the dictionary from the state', () => {
    const action: DictionaryAction = {
      type: DictionaryActionType.UNSELECT,
      dictionary,
    };
    expect(selectDictionaryReducer(dictionary, action)).toEqual(null);
  });
});
