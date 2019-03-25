import {
  addDictionaryAction, updateDictionaryAction, removeDictionaryAction,
  selectDictionaryAction, unselectDictionaryAction, DictionaryActionType,
} from '../dictionaries.actions';
import { Dictionary, DictionaryToInsert } from '../dictionary';

const dictionaryToInsert: DictionaryToInsert = { from: 'from-dictionary', to: 1 };
const dictionary: Dictionary = { id: 1, from: 'from-dictionary', to: 1 };

describe('dictionariesActions', () => {
  describe('addDictionaryAction', () => {
    it('should return the action', () => {
      expect(addDictionaryAction(dictionaryToInsert)).toEqual({
        type: DictionaryActionType.ADD,
        dictionary: dictionaryToInsert,
      });
    });
  });

  describe('updateDictionaryAction', () => {
    it('should return the action', () => {
      expect(updateDictionaryAction(dictionary)).toEqual({
        type: DictionaryActionType.UPDATE,
        dictionary,
      });
    });
  });

  describe('removeDictionaryAction', () => {
    it('should return the action', () => {
      expect(removeDictionaryAction(dictionary)).toEqual({
        type: DictionaryActionType.REMOVE,
        dictionary,
      });
    });
  });

  describe('selectDictionaryAction', () => {
    it('should return the action', () => {
      expect(selectDictionaryAction(dictionary)).toEqual({
        type: DictionaryActionType.SELECT,
        dictionary,
      });
    });
  });

  describe('unselectDictionaryAction', () => {
    it('should return the action', () => {
      expect(unselectDictionaryAction(dictionary)).toEqual({
        type: DictionaryActionType.UNSELECT,
        dictionary,
      });
    });
  });
});
