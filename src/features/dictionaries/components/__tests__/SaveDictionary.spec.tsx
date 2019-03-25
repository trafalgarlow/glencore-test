/* eslint-disable  @typescript-eslint/no-object-literal-type-assertion */

import React, { FormEvent, ChangeEvent } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TextField, Button } from '@material-ui/core';
import { ColorPicker } from 'features/colors/components';
import SaveDictionary, { SaveDictionaryProps } from '../SaveDictionary';

jest.mock('components');

const mockIsFromNotAvailable: jest.Mock = jest.fn().mockImplementation();
const mockIsSubmitDisabled: jest.Mock = jest.fn().mockImplementation();
const mockOnSubmit: jest.Mock = jest.fn().mockImplementation();

const submitEvent = { preventDefault: () => {} } as FormEvent<HTMLFormElement>;
const changeEvent = { target: { value: 'new-from' } } as ChangeEvent<HTMLInputElement>;

let component: ShallowWrapper<SaveDictionaryProps>;
let instance: SaveDictionary;


describe('SaveDictionary', () => {
  beforeEach(() => {
    component = shallow<SaveDictionary>(
      <SaveDictionary
        from="from"
        to={2}
        isFromNotAvailable={mockIsFromNotAvailable}
        isSubmitDisabled={mockIsSubmitDisabled}
        onSubmit={mockOnSubmit}
      />,
    );
    instance = component.instance() as SaveDictionary;
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

    it('should have the onSubmit prop equals to the onSubmit method', () => {
      expect(component.find('form').prop('onSubmit')).toEqual(instance.onSubmit);
    });

    it('should call the onSubmit method when the form is submit', () => {
      jest.spyOn(instance, 'onSubmit').mockImplementation();
      component.update();
      instance.forceUpdate();
      component.find('form').simulate('submit', submitEvent);
      expect(instance.onSubmit).toHaveBeenCalledWith(submitEvent);
    });
  });

  describe('From Text Field', () => {
    it('should be rendered', () => {
      expect(component.find(TextField).at(0).prop('label')).toEqual('Dictionary From');
    });

    it('should have the value prop has the given value prop', () => {
      expect(component.find(TextField).at(0).prop('value')).toEqual('from');
    });

    it('should have the onChange prop has the onChangeFrom method', () => {
      expect(component.find(TextField).at(0).prop('onChange')).toEqual(instance.onChangeFrom);
    });

    it('should call the onChange method when the field changes', () => {
      jest.spyOn(instance, 'onChangeFrom').mockImplementation();
      component.update();
      instance.forceUpdate();
      component.find(TextField).at(0).simulate('change', changeEvent);
      expect(instance.onChangeFrom).toHaveBeenCalledWith(changeEvent);
    });
  });

  describe('Is From Not Available Error Message', () => {
    it('should be rendered if the from is not available', () => {
      mockIsFromNotAvailable.mockReturnValue(true);
      component.update();
      instance.forceUpdate();
      expect(component.find('.text-danger').text()).toEqual('The current from name is not available.');
    });

    it('should not be rendered if the from is available', () => {
      mockIsFromNotAvailable.mockReturnValue(false);
      component.update();
      instance.forceUpdate();
      expect(component.find('.text-danger')).toHaveLength(0);
    });
  });

  describe('ColorPicker', () => {
    it('should be rendered', () => {
      expect(component.find(ColorPicker)).toHaveLength(1);
    });

    it('should have the value prop equals to the to prop', () => {
      expect(component.find(ColorPicker).prop('value')).toEqual(2);
    });

    it('should have the onSelectColor prop equals to the onSelectColor prop', () => {
      expect(component.find(ColorPicker).prop('onSelectColor')).toEqual(instance.onSelectColor);
    });
  });

  describe('Button', () => {
    it('should be rendered', () => {
      expect(component.find(Button)).toHaveLength(1);
    });

    it('should have the disabled prop equals to the returning value of the isSubmitDisabled prop', () => {
      mockIsSubmitDisabled.mockReturnValue('disabled-value');
      component.update();
      instance.forceUpdate();
      expect(component.find(Button).prop('disabled')).toEqual('disabled-value');
    });
  });

  describe('onSubmit', () => {
    it('should call onSubmit prop', () => {
      component.setState({ from: 'new-from', to: 28 });
      instance.onSubmit(submitEvent);
      expect(mockOnSubmit).toHaveBeenCalledWith('new-from', 28);
    });

    it('should reset the state fields', () => {
      component.setState({ from: 'new-from', to: 28 });
      jest.spyOn(instance, 'setState').mockImplementation();
      instance.onSubmit(submitEvent);
      expect(instance.setState).toHaveBeenCalledWith({ from: '', to: NaN });
    });
  });

  describe('onChangeFrom', () => {
    it('should set the given from value to the state', () => {
      jest.spyOn(instance, 'setState').mockImplementation();
      instance.onChangeFrom(changeEvent);
      expect(instance.setState).toHaveBeenCalledWith(({ from: 'new-from' }));
    });
  });

  describe('onSelectColor', () => {
    it('should set the selected color to the state', () => {
      jest.spyOn(instance, 'setState').mockImplementation();
      instance.onSelectColor({ id: 28, name: 'new-color' });
      expect(instance.setState).toHaveBeenCalledWith(({ to: 28 }));
    });
  });
});
