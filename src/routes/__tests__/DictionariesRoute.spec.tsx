/* eslint-disable react/forbid-prop-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-object-literal-type-assertion */

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PropTypes from 'prop-types';
import { DictionariesContextValues } from 'features/dictionaries/providers/DictionariesContext';
import { DictionariesTable, EditDictionary, AddDictionary } from 'features/dictionaries/components';
import { Dictionary } from 'features/dictionaries/dictionary';
import { Color } from 'features/colors/color';
import { DictionariesRoute, DictionariesRouteProps } from '../DictionariesRoute';

jest.mock('features/dictionaries/components');

const color1: Color = { id: 1, name: 'color-name-1' };
const color2: Color = { id: 2, name: 'color-name-2' };
const dictionary1: Dictionary = { id: 1, from: 'from-1', to: 2 };
const dictionary2: Dictionary = { id: 2, from: 'from-2', to: 1 };
const dictionaries: Dictionary[] = [dictionary1, dictionary2];

const mockShow: jest.Mock = jest.fn().mockImplementation();
const mockHide: jest.Mock = jest.fn().mockImplementation();

type GetDictionaryColorType = (id: number) => Color;
const mockGetDictionaryColor: jest.Mock = jest.fn().mockImplementation((id: number) => (id === 1 ? color1 : color2));
const context: DictionariesContextValues = {
  selectedDictionary: null,
  getDictionaryColor: mockGetDictionaryColor as GetDictionaryColorType,
  dictionaries,
} as DictionariesContextValues;
(DictionariesRoute as any).contextTypes = {
  getDictionaryColor: PropTypes.any,
  dictionaries: PropTypes.any,
  selectedDictionary: PropTypes.any,
};

let component: ShallowWrapper<DictionariesRouteProps>;
let instance: DictionariesRoute;

describe('DictionariesRoute', () => {
  beforeEach(() => {
    component = shallow<DictionariesRouteProps>(<DictionariesRoute
      show={mockShow}
      hide={mockHide}
    />, { context: context as DictionariesContextValues });
    instance = component.instance() as DictionariesRoute;
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  describe('DictionariesTable', () => {
    it('should be rendered', () => {
      expect(component.find(DictionariesTable)).toHaveLength(1);
    });

    it('should have the dictionaries prop as the dictionaries in the context', () => {
      expect(component.find(DictionariesTable).prop('dictionaries')).toEqual(dictionaries);
    });
  });

  describe('AddDictionary', () => {
    beforeEach(() => {
      component.setContext({ selectedDictionary: null });
    });

    it('should be rendered if the selectedDictionary context value is null', () => {
      expect(component.find(AddDictionary)).toHaveLength(1);
    });

    it('should have the onAdd prop equals to the onAdd method', () => {
      expect(component.find(AddDictionary).prop('onAdd')).toEqual(instance.onAdd);
    });

    it('should not render the EditDictionary if the selectedDictionary context value is null', () => {
      expect(component.find(EditDictionary)).toHaveLength(0);
    });
  });

  describe('EditDictionary', () => {
    beforeEach(() => {
      component.setContext({ selectedDictionary: dictionary2 });
      component.update();
      instance.forceUpdate();
    });

    it('should be rendered if the selectedDictionary context value is not null', () => {
      expect(component.find(EditDictionary)).toHaveLength(1);
    });

    it('should have the onEdit prop equals to the onEdit method', () => {
      expect(component.find(EditDictionary).prop('onEdit')).toEqual(instance.onEdit);
    });

    it('should have the dictionary prop equals to the current selected dictionary', () => {
      expect(component.find(EditDictionary).prop('dictionary')).toEqual(dictionary2);
    });

    it('should not render the AddDictionary if the selectedDictionary context value is not null', () => {
      expect(component.find(AddDictionary)).toHaveLength(0);
    });
  });

  describe('onEdit', () => {
    beforeEach(() => {
      instance.onEdit(dictionary1, { from: 'updated-from', to: 1 });
    });

    it('should call the getDictionaryColor twice for getting the two colors', () => {
      expect(mockGetDictionaryColor).toHaveBeenCalledTimes(2);
      expect(mockGetDictionaryColor).toHaveBeenNthCalledWith(1, 2);
      expect(mockGetDictionaryColor).toHaveBeenNthCalledWith(2, 1);
    });

    it('should call the show prop', () => {
      expect(mockShow).toHaveBeenCalledWith({
        content: expect.stringMatching(/"from-1 - color-name-2"\s*updated correctly to\s*"updated-from - color-name-1"/),
        autoHideDuration: 5000,
      });
    });
  });

  describe('onAdd', () => {
    beforeEach(() => {
      instance.onAdd({ from: 'new-dictionary', to: 2 });
    });

    it('should call the getDictionaryColor', () => {
      expect(mockGetDictionaryColor).toHaveBeenCalledWith(2);
    });

    it('should call the show prop', () => {
      expect(mockShow).toHaveBeenCalledWith({
        content: 'Dictionary "new-dictionary - color-name-2" added correctly',
        autoHideDuration: 5000,
      });
    });
  });
});
