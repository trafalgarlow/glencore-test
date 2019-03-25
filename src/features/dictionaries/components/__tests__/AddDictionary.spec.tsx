/* eslint-disable react/forbid-prop-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-object-literal-type-assertion */

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PropTypes from 'prop-types';
import { StringUtils, NumberUtils } from 'utils';
import { DictionariesContextValues } from '../../providers/DictionariesContext';
import AddDictionary, { AddDictionaryProps } from '../AddDictionary';
import SaveDictionary from '../SaveDictionary';
import { DictionaryToInsert } from '../../dictionary';

jest.mock('../SaveDictionary');
jest.mock('utils');

const mockOnAdd: jest.Mock = jest.fn().mockImplementation(() => {});
const mockOnAddDictionary: jest.Mock = jest.fn().mockImplementation(() => {});
const mockIsFromAvailable: jest.Mock = jest.fn().mockImplementation(() => {});
const context: DictionariesContextValues = {
  addDictionary: mockOnAddDictionary,
  isFromAvailable: mockIsFromAvailable,
} as any;
(AddDictionary as any).contextTypes = {
  addDictionary: PropTypes.any,
  isFromAvailable: PropTypes.any,
};

let component: ShallowWrapper<AddDictionaryProps>;
let instance: AddDictionary;

describe('AddDictionary', () => {
  beforeEach(() => {
    component = shallow<AddDictionaryProps>(<AddDictionary
      onAdd={mockOnAdd}
    />, { context: context as DictionariesContextValues });
    instance = component.instance() as AddDictionary;
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render the SaveDictionary', () => {
    expect(component.find(SaveDictionary)).toHaveLength(1);
  });

  it('should assign the onSubmit method to the SaveDictionary onSubmit prop', () => {
    expect(component.find(SaveDictionary).prop('onSubmit')).toEqual(instance.onSubmit);
  });

  it('should assign the isFromNotAvailable method to the SaveDictionary isFromNotAvailable prop', () => {
    expect(component.find(SaveDictionary).prop('isFromNotAvailable')).toEqual(instance.isFromNotAvailable);
  });

  it('should assign the isSubmitDisabled method to the SaveDictionary isSubmitDisabled prop', () => {
    expect(component.find(SaveDictionary).prop('isSubmitDisabled')).toEqual(instance.isSubmitDisabled);
  });

  describe('isFromNotAvailable', () => {
    it('should call the isFromNotAvailable of the context', () => {
      instance.isFromNotAvailable('from');
      expect(mockIsFromAvailable).toHaveBeenCalledWith('from');
    });
  });

  describe('isFromValid', () => {
    it('should call the isEmpty method of StringUtils', () => {
      instance.isFromValid('from');
      expect(StringUtils.isEmpty).toHaveBeenCalledWith('from');
    });

    it('should call the isFromNotAvailable method', () => {
      jest.spyOn(instance, 'isFromNotAvailable').mockImplementation();
      instance.isFromValid('from');
      expect(instance.isFromNotAvailable).toHaveBeenCalledWith('from');
    });

    it('should return false if the from is empty', () => {
      jest.spyOn(StringUtils, 'isEmpty').mockReturnValue(true);
      expect(instance.isFromValid('')).toBeFalsy();
    });

    it('should return false if the from is not empty but is not available', () => {
      jest.spyOn(StringUtils, 'isEmpty').mockReturnValue(false);
      jest.spyOn(instance, 'isFromNotAvailable').mockReturnValue(true);
      expect(instance.isFromValid('from')).toBeFalsy();
    });

    it('should return false if the from is not empty but is not available', () => {
      jest.spyOn(StringUtils, 'isEmpty').mockReturnValue(false);
      jest.spyOn(instance, 'isFromNotAvailable').mockReturnValue(false);
      expect(instance.isFromValid('from')).toBeTruthy();
    });
  });

  describe('isSubmitDisabled', () => {
    it('should call the isFromValid method', () => {
      jest.spyOn(instance, 'isFromValid').mockImplementation();
      instance.isSubmitDisabled('from', 1);
      expect(instance.isFromValid).toHaveBeenCalledWith('from');
    });

    it('should call the isValidId method of NumberUtils', () => {
      jest.spyOn(instance, 'isFromValid').mockReturnValue(true);
      jest.spyOn(NumberUtils, 'isValidId').mockImplementation();
      instance.isSubmitDisabled('from', 1);
      expect(NumberUtils.isValidId).toHaveBeenCalledWith(1);
    });

    it('should return true if the form is not valid', () => {
      jest.spyOn(instance, 'isFromValid').mockReturnValue(false);
      expect(instance.isSubmitDisabled('from', 1)).toBeTruthy();
    });

    it('should return true if the form is valid but the to is not a valid id', () => {
      jest.spyOn(instance, 'isFromValid').mockReturnValue(true);
      jest.spyOn(NumberUtils, 'isValidId').mockReturnValue(false);
      expect(instance.isSubmitDisabled('from', 1)).toBeTruthy();
    });

    it('should return false if the form is valid and the id is too', () => {
      jest.spyOn(instance, 'isFromValid').mockReturnValue(true);
      jest.spyOn(NumberUtils, 'isValidId').mockReturnValue(true);
      expect(instance.isSubmitDisabled('from', 1)).toBeFalsy();
    });
  });

  describe('onSubmit', () => {
    const dictionary: DictionaryToInsert = { from: 'from', to: 1 };

    it('should call the onAdd prop', () => {
      instance.onSubmit('from', 1);
      expect(mockOnAdd).toHaveBeenCalledWith(dictionary);
    });

    it('should call the onAddDictionary context', () => {
      instance.onSubmit('from', 1);
      expect(mockOnAddDictionary).toHaveBeenCalledWith(dictionary);
    });
  });
});
