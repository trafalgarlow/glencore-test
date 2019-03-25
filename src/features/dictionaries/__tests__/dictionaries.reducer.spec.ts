import { ArrayUtils } from 'utils';
import dictionariesReducer from '../dictionaries.reducer';
import { Dictionary, DictionaryToInsert } from '../dictionary';
import { DictionaryAction, DictionaryActionType } from '../dictionaries.actions';


jest.mock('utils');

const dictionaryToInsert: DictionaryToInsert = { from: 'name', to: 3 };
const dictionary: Dictionary = { ...dictionaryToInsert, id: 1 };

describe('dictionariesReducer', () => {
  it('should return the state if the action is not matched', () => {
    const action: DictionaryAction = {
      type: ('' as DictionaryActionType),
      dictionary,
    };
    expect(dictionariesReducer([], action)).toEqual([]);
  });

  describe('ADD', () => {
    const action: DictionaryAction = {
      type: DictionaryActionType.ADD,
      dictionary: dictionaryToInsert,
    };

    it('should call the findNextId method of ArrayUtils', () => {
      dictionariesReducer([dictionary], action);
      expect(ArrayUtils.findNextId).toHaveBeenCalledWith([dictionary]);
    });

    it('should add the dictionary in the state', () => {
      jest.spyOn(ArrayUtils, 'findNextId').mockReturnValue(1);
      expect(dictionariesReducer([], action)).toEqual([dictionary]);
    });
  });

  it('should remove the dictionary from the state', () => {
    const action: DictionaryAction = {
      type: DictionaryActionType.REMOVE,
      dictionary,
    };
    expect(dictionariesReducer([dictionary], action)).toEqual([]);
  });

  it('should update the dictionary in the state', () => {
    const updatedDictionary: Dictionary = { id: 1, from: 'updated dictionary', to: 1 };
    const action: DictionaryAction = {
      type: DictionaryActionType.UPDATE,
      dictionary: updatedDictionary,
    };
    expect(dictionariesReducer([dictionary], action)).toEqual([updatedDictionary]);
  });
});
