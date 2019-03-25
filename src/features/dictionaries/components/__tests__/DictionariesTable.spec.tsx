import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Dictionary } from '../../dictionary';
import DictionariesTable, { DictionariesTableProps } from '../DictionariesTable';
import DictionaryRow from '../DictionaryRow';

jest.mock('../DictionaryRow');

const dictionary1: Dictionary = { id: 1, from: 'from-1', to: 2 };
const dictionary2: Dictionary = { id: 2, from: 'from-2', to: 1 };
const dictionaries: Dictionary[] = [dictionary1, dictionary2];

let component: ShallowWrapper<DictionariesTableProps>;

describe('DictionariesTable', () => {
  beforeEach(() => {
    component = shallow<DictionariesTable>(
      <DictionariesTable
        dictionaries={dictionaries}
      />,
    );
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render a DictionaryRow for each dictionary', () => {
    expect(component.find(DictionaryRow)).toHaveLength(2);
  });

  describe('First DictionaryRow', () => {
    it('should have the key equals to the dictionary id', () => {
      expect(component.find(DictionaryRow).at(0).key()).toEqual('1');
    });

    it('should have the dictionary prop equals to the dictionary', () => {
      expect(component.find(DictionaryRow).at(0).prop('dictionary')).toEqual(dictionary1);
    });
  });

  describe('Second DictionaryRow', () => {
    it('should have the key equals to the dictionary id', () => {
      expect(component.find(DictionaryRow).at(1).key()).toEqual('2');
    });

    it('should have the dictionary prop equals to the dictionary', () => {
      expect(component.find(DictionaryRow).at(1).prop('dictionary')).toEqual(dictionary2);
    });
  });
});
