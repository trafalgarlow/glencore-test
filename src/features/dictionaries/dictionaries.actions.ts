import { DictionaryToInsert, Dictionary } from './dictionary';

enum DictionaryActionType {
  ADD = 'ADD_DICTIONARY',
  UPDATE = 'UPDATE_DICTIONARY',
  REMOVE = 'REMOVE_DICTIONARY',
  SELECT = 'SELECT_DICTIONARY',
  UNSELECT = 'UNSELECT_DICTIONARY',
}

export interface DictionaryAction {
  type: DictionaryActionType;
  dictionary: DictionaryToInsert | Dictionary;
}

export type AddDictionaryActionType = (dictionary: DictionaryToInsert) => DictionaryAction;
export type GenericDictionaryActionType = (dictionary: Dictionary) => DictionaryAction;

const addDictionaryAction = (dictionary: DictionaryToInsert): DictionaryAction => ({
  type: DictionaryActionType.ADD,
  dictionary,
});

const updateDictionaryAction = (dictionary: Dictionary): DictionaryAction => ({
  type: DictionaryActionType.UPDATE,
  dictionary,
});

const removeDictionaryAction = (dictionary: Dictionary): DictionaryAction => ({
  type: DictionaryActionType.REMOVE,
  dictionary,
});

const selectDictionaryAction = (dictionary: Dictionary): DictionaryAction => ({
  type: DictionaryActionType.SELECT,
  dictionary,
});

const unselectDictionaryAction = (dictionary: Dictionary): DictionaryAction => ({
  type: DictionaryActionType.UNSELECT,
  dictionary,
});

export {
  DictionaryActionType,
  addDictionaryAction,
  updateDictionaryAction,
  removeDictionaryAction,
  selectDictionaryAction,
  unselectDictionaryAction,
};
