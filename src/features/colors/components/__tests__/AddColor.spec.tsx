/* eslint-disable react/forbid-prop-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-object-literal-type-assertion */

import React, { ChangeEvent, FormEvent } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { StringUtils } from 'utils';
import { ColorsContextValues } from 'features/colors/providers/ColorsContext';
import { AddColor, AddColorProps } from '../AddColor';
import { Color, ColorToInsert } from '../../color';

jest.mock('utils');
jest.mock('../../colors.actions');

const mockShow: jest.Mock = jest.fn().mockImplementation(() => {});
const mockHide: jest.Mock = jest.fn().mockImplementation(() => {});
const mockAddColor: jest.Mock = jest.fn().mockImplementation(() => {});
const mockIsColorNameNotAvailable: jest.Mock = jest.fn().mockImplementation(() => {});
const color1: Color = { id: 1, name: 'color-1' };
const color2: Color = { id: 2, name: 'color-2' };
const context: ColorsContextValues = {
  colors: [color1, color2],
  addColor: mockAddColor,
  isColorNameNotAvailable: mockIsColorNameNotAvailable,
} as any;
(AddColor as any).contextTypes = {
  colors: PropTypes.any,
  addColor: PropTypes.any,
  isColorNameNotAvailable: PropTypes.any,
};

let component: ShallowWrapper<AddColorProps>;
let instance: AddColor;

describe('AddColor', () => {
  beforeEach(() => {
    component = shallow<AddColorProps>(<AddColor
      show={mockShow}
      hide={mockHide}
    />, { context });
    instance = component.instance() as AddColor;
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  describe('Form', () => {
    it('should be rendered', () => {
      expect(component.find('form')).toHaveLength(1);
    });

    it('should have the onAddColor method associated to the onSubmit prop', () => {
      expect(component.find('form').prop('onSubmit')).toEqual(instance.onAddColor);
    });

    it('should call the onAddColor method when submits', () => {
      jest.spyOn(instance, 'onAddColor').mockImplementation(() => {});
      component.update();
      instance.forceUpdate();
      const submitEvent = { preventDefault: () => {} };
      component.find('form').simulate('submit', submitEvent);
      expect(instance.onAddColor).toHaveBeenCalledWith(submitEvent);
    });
  });

  describe('Name Text Field', () => {
    it('should be rendered', () => {
      expect(component.find(TextField)).toHaveLength(1);
    });

    it('should be empty at the beginning', () => {
      expect(component.find(TextField).prop('value')).toEqual('');
    });

    it('should be updated changing the state', () => {
      component.setState({ name: 'new color' });
      expect(component.find(TextField).prop('value')).toEqual('new color');
    });

    it('should call the onChangeName method when changes', () => {
      jest.spyOn(instance, 'onChangeName').mockImplementation(() => {});
      component.update();
      instance.forceUpdate();
      const changeEvent = { target: { value: 'new color' } };
      component.find(TextField).simulate('change', changeEvent);
      expect(instance.onChangeName).toHaveBeenCalledWith(changeEvent);
    });
  });

  describe('isNameNotAvailable error', () => {
    it('should display the error if the name is not available', () => {
      jest.spyOn(instance, 'isNameNotAvailable').mockReturnValue(true);
      component.update();
      instance.forceUpdate();
      expect(component.find('.text-danger')).toHaveLength(1);
    });

    it('should not display the error if the name is available', () => {
      jest.spyOn(instance, 'isNameNotAvailable').mockReturnValue(false);
      component.update();
      instance.forceUpdate();
      expect(component.find('.text-danger')).toHaveLength(0);
    });
  });

  describe('Add Button', () => {
    it('should be disabled if not valid', () => {
      jest.spyOn(instance, 'isAddDisabled').mockReturnValue(true);
      component.update();
      instance.forceUpdate();
      expect(component.find(Button).prop('disabled')).toBeTruthy();
    });

    it('should be enabled if valid', () => {
      jest.spyOn(instance, 'isAddDisabled').mockReturnValue(false);
      component.update();
      instance.forceUpdate();
      expect(component.find(Button).prop('disabled')).toBeFalsy();
    });
  });

  describe('methods', () => {
    describe('isNameEmpty', () => {
      it('should call the isEmpty method of StringUtils', () => {
        component.setState({ name: 'new color' });
        instance.isNameEmpty();
        expect(StringUtils.isEmpty).toHaveBeenCalledWith('new color');
      });
    });

    describe('isNameNotAvailable', () => {
      it('should call the isColorNameNotAvailable method of context', () => {
        component.setState({ name: 'new color' });
        instance.isNameNotAvailable();
        expect(mockIsColorNameNotAvailable).toHaveBeenCalledWith('new color');
      });
    });

    describe('isAddDisabled', () => {
      it('should call the isNameEmpty method', () => {
        jest.spyOn(instance, 'isNameEmpty');
        instance.isAddDisabled();
        expect(instance.isNameEmpty).toHaveBeenCalled();
      });

      it('should call the isNameNotAvailable method', () => {
        jest.spyOn(instance, 'isNameNotAvailable');
        instance.isAddDisabled();
        expect(instance.isNameNotAvailable).toHaveBeenCalled();
      });
    });

    describe('onChangeName', () => {
      it('should call the setState', () => {
        jest.spyOn(instance, 'setState');
        const event = { target: { value: 'new color' } } as ChangeEvent<HTMLInputElement>;
        instance.onChangeName(event);
        expect(instance.setState).toHaveBeenCalledWith({ name: 'new color' });
      });
    });

    describe('onAddColor', () => {
      let colorToAdd: ColorToInsert;
      beforeEach(() => {
        jest.spyOn(instance, 'setState');
        colorToAdd = { name: 'new-color' };
        component.setState(colorToAdd);
        const event = { preventDefault: () => {} } as FormEvent<HTMLFormElement>;
        instance.onAddColor(event);
      });

      it('should call the addColor context prop', () => {
        expect(mockAddColor).toHaveBeenCalledWith(colorToAdd);
      });

      it('should call the show prop', () => {
        expect(mockShow).toHaveBeenCalledWith({
          content: 'Color "new-color" added correctly',
          position: {
            vertical: 'top',
            horizontal: 'right',
          },
          autoHideDuration: 5000,
        });
      });

      it('should call the setState', () => {
        expect(instance.setState).toHaveBeenCalledWith({ name: '' });
      });
    });
  });
});
