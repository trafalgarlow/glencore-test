/* eslint-disable react/forbid-prop-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-object-literal-type-assertion */

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PropTypes from 'prop-types';
import { SelectField } from 'components';
import { DictionariesContextValues } from '../../providers/DictionariesContext';
import DictionaryPicker, { DictionaryPickerProps } from '../DictionaryPicker';
import { Dictionary } from '../../dictionary';

jest.mock('components');

const dictionary1: Dictionary = { id: 1, from: 'from-1', to: 2 };
const dictionary2: Dictionary = { id: 2, from: 'from-2', to: 1 };
const dictionaries: Dictionary[] = [dictionary1, dictionary2];

const mockOnSelectDictionary: jest.Mock = jest.fn().mockImplementation();

const context: DictionariesContextValues = { dictionaries } as any;
(DictionaryPicker as any).contextTypes = { dictionaries: PropTypes.any };

let component: ShallowWrapper<DictionaryPickerProps>;
let instance: DictionaryPicker;

describe('DictionaryPicker', () => {
  beforeEach(() => {
    component = shallow<DictionaryPickerProps>(<DictionaryPicker
      value={NaN}
      onSelectDictionary={mockOnSelectDictionary}
    />, { context: context as DictionariesContextValues });
    instance = component.instance() as DictionaryPicker;
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  describe('SelectField', () => {
    it('should be rendered', () => {
      expect(component.find(SelectField)).toHaveLength(1);
    });

    it('should have the initial value as NaN', () => {
      expect(component.find(SelectField).prop('value')).toEqual(NaN);
    });

    it('should have the options prop as the given dictionaries', () => {
      expect(component.find(SelectField).prop('options')).toEqual(dictionaries);
    });

    it('should have the onSelect prop equals to the onSelect method', () => {
      expect(component.find(SelectField).prop('onSelect')).toEqual(instance.onSelect);
    });
  });

  describe('onSelect', () => {
    it('should call the onSelectDictionary prop', () => {
      instance.onSelect(dictionary2);
      expect(mockOnSelectDictionary).toHaveBeenCalledWith(dictionary2);
    });
  });
});
