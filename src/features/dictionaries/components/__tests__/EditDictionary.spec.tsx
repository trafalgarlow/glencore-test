/* eslint-disable react/forbid-prop-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-object-literal-type-assertion */

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { StringUtils } from 'utils';
import { FullScreenDialog } from 'components';
import { FullScreenDialogProps, FullScreenDialogRenderProps } from 'components/FullScreenDialog';
import { DictionariesContextValues } from '../../providers/DictionariesContext';
import EditDictionary, { EditDictionaryProps } from '../EditDictionary';
import SaveDictionary from '../SaveDictionary';
import { Dictionary } from '../../dictionary';

jest.mock('../SaveDictionary');
jest.mock('components');
jest.mock('utils');

const dictionary: Dictionary = { id: 1, from: 'from', to: 2 };

const mockOnEdit: jest.Mock = jest.fn().mockImplementation(() => {});

const mockUpdateDictionary: jest.Mock = jest.fn().mockImplementation(() => {});
const mockIsFromAvailable: jest.Mock = jest.fn().mockImplementation(() => {});
const mockUnselectDictionary: jest.Mock = jest.fn().mockImplementation(() => {});
const context: DictionariesContextValues = {
  updateDictionary: mockUpdateDictionary,
  isFromAvailable: mockIsFromAvailable,
  unselectDictionary: mockUnselectDictionary,
} as any;
(EditDictionary as any).contextTypes = {
  updateDictionary: PropTypes.any,
  isFromAvailable: PropTypes.any,
  unselectDictionary: PropTypes.any,
};

let component: ShallowWrapper<EditDictionaryProps>;
let instance: EditDictionary;
let fullScreenDialog: ShallowWrapper<FullScreenDialogProps>;
let fullScreenDialogRendererProps: ShallowWrapper<FullScreenDialogRenderProps>;

describe('EditDictionary', () => {
  beforeEach(() => {
    component = shallow<EditDictionaryProps>(<EditDictionary
      dictionary={dictionary}
      onEdit={mockOnEdit}
    />, { context: context as DictionariesContextValues });
    instance = component.instance() as EditDictionary;
    fullScreenDialog = component.find(FullScreenDialog);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  describe('FullScreenDialog', () => {
    it('should be rendered', () => {
      expect(fullScreenDialog).toHaveLength(1);
    });

    it('should have the dictionary name as title', () => {
      expect(fullScreenDialog.prop('title')).toEqual(
        <Typography variant="h6" color="inherit">from</Typography>,
      );
    });

    it('should assign the onClose method to the onClose prop', () => {
      expect(fullScreenDialog.prop('onClose')).toEqual(instance.onClose);
    });
  });

  describe('SaveDictionary', () => {
    beforeEach(() => {
      fullScreenDialogRendererProps = fullScreenDialog.dive();
    });

    it('should be rendered', () => {
      expect(fullScreenDialogRendererProps.find(SaveDictionary)).toHaveLength(1);
    });

    it('should have the from prop equals to the given dictionary from', () => {
      expect(fullScreenDialogRendererProps.find(SaveDictionary).prop('from')).toEqual('from');
    });

    it('should have the to prop equals to the given dictionary to', () => {
      expect(fullScreenDialogRendererProps.find(SaveDictionary).prop('to')).toEqual(2);
    });

    it('should have the isFromNotAvailable prop equals to the isFromNotAvailable method', () => {
      expect(fullScreenDialogRendererProps.find(SaveDictionary).prop('isFromNotAvailable')).toEqual(instance.isFromNotAvailable);
    });

    it('should have the isSubmitDisabled prop equals to the isSubmitDisabled method', () => {
      expect(fullScreenDialogRendererProps.find(SaveDictionary).prop('isSubmitDisabled')).toEqual(instance.isSubmitDisabled);
    });

    it('should have the onSubmit prop equals to a function', () => {
      expect(fullScreenDialogRendererProps.find(SaveDictionary).prop('onSubmit')).toEqual(expect.any(Function));
    });
  });

  describe('hasBeenEdit', () => {
    it('should call the areEquals method of StringUtils', () => {
      instance.hasBeenEdit('edited-from', 28);
      expect(StringUtils.areEquals).toHaveBeenCalledWith('from', 'edited-from');
    });

    it('should return false if the edited from is equal to the given from and the to has not changed either', () => {
      jest.spyOn(StringUtils, 'areEquals').mockReturnValue(true);
      expect(instance.hasBeenEdit('from', 2)).toBeFalsy();
    });

    it('should return true if the edited from is equal to the given from and the to has changed', () => {
      jest.spyOn(StringUtils, 'areEquals').mockReturnValue(true);
      expect(instance.hasBeenEdit('from', 28)).toBeTruthy();
    });

    it('should return true if the edited from is different from the given from and the to has not changed', () => {
      jest.spyOn(StringUtils, 'areEquals').mockReturnValue(false);
      expect(instance.hasBeenEdit('edited-from', 2)).toBeTruthy();
    });

    it('should return true if the edited from is different from the given from and the to has changed either', () => {
      jest.spyOn(StringUtils, 'areEquals').mockReturnValue(false);
      expect(instance.hasBeenEdit('edited-from', 28)).toBeTruthy();
    });
  });

  describe('isFromValid', () => {
    it('should call the isEmpty method of StringUtils', () => {
      instance.isFromValid('edited-from');
      expect(StringUtils.isEmpty).toHaveBeenCalledWith('edited-from');
    });

    it('should call the isFromNotAvailable method', () => {
      jest.spyOn(StringUtils, 'isEmpty').mockReturnValue(false);
      jest.spyOn(instance, 'isFromNotAvailable').mockImplementation();
      instance.isFromValid('edited-from');
      expect(instance.isFromNotAvailable).toHaveBeenCalledWith('edited-from');
    });

    it('should return false if the from is blank', () => {
      jest.spyOn(StringUtils, 'isEmpty').mockReturnValue(true);
      expect(instance.isFromValid('')).toBeFalsy();
    });

    it('should return false if the from is not blank but it is not available', () => {
      jest.spyOn(StringUtils, 'isEmpty').mockReturnValue(false);
      jest.spyOn(instance, 'isFromNotAvailable').mockReturnValue(true);
      expect(instance.isFromValid('edited-from')).toBeFalsy();
    });

    it('should return true if the from is not blank and it is available', () => {
      jest.spyOn(StringUtils, 'isEmpty').mockReturnValue(false);
      jest.spyOn(instance, 'isFromNotAvailable').mockReturnValue(false);
      expect(instance.isFromValid('edited-from')).toBeTruthy();
    });
  });

  describe('isSubmitDisabled', () => {
    it('should call the hasBeenEdit method', () => {
      jest.spyOn(instance, 'hasBeenEdit').mockImplementation();
      instance.isSubmitDisabled('edited-from', 28);
      expect(instance.hasBeenEdit).toHaveBeenCalledWith('edited-from', 28);
    });

    it('should call the isFromValid method', () => {
      jest.spyOn(instance, 'hasBeenEdit').mockReturnValue(true);
      jest.spyOn(instance, 'isFromValid').mockImplementation();
      instance.isSubmitDisabled('edited-from', 28);
      expect(instance.isFromValid).toHaveBeenCalledWith('edited-from');
    });

    it('should return true if the form has not been edited', () => {
      jest.spyOn(instance, 'hasBeenEdit').mockReturnValue(false);
      expect(instance.isSubmitDisabled('edited-from', 28)).toBeTruthy();
    });

    it('should return true if the form has been edited but the from is not valid', () => {
      jest.spyOn(instance, 'hasBeenEdit').mockReturnValue(false);
      jest.spyOn(instance, 'isFromValid').mockReturnValue(false);
      expect(instance.isSubmitDisabled('edited-from', 28)).toBeTruthy();
    });

    it('should return false if the form has been edited but the from is valid', () => {
      jest.spyOn(instance, 'hasBeenEdit').mockReturnValue(true);
      jest.spyOn(instance, 'isFromValid').mockReturnValue(true);
      expect(instance.isSubmitDisabled('edited-from', 28)).toBeFalsy();
    });
  });

  describe('onSubmit', () => {
    let mockCloseCallback: jest.Mock;
    beforeEach(() => {
      mockCloseCallback = jest.fn().mockImplementation();
      instance.onSubmit(mockCloseCallback)('edited-from', 28);
    });

    it('should call the provided close callback', () => {
      expect(mockCloseCallback).toHaveBeenCalled();
    });

    it('should call the updateDictionary context method', () => {
      expect(mockUpdateDictionary).toHaveBeenCalledWith({ id: 1, from: 'edited-from', to: 28 });
    });

    it('should call the onEdit prop', () => {
      expect(mockOnEdit).toHaveBeenCalledWith(dictionary, { from: 'edited-from', to: 28 });
    });
  });

  describe('onClose', () => {
    it('should call the unselectDictionary context method', () => {
      instance.onClose();
      expect(mockUnselectDictionary).toHaveBeenCalledWith(dictionary);
    });
  });
});
