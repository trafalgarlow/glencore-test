import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import {
  FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import SelectField, { OptionElement, SelectFieldProps } from '../SelectField';

const option1: OptionElement = { id: 1, test: 'test-1' };
const option2: OptionElement = { id: 2, test: 'test-2' };
const options: OptionElement[] = [option1, option2];
const mockOnRender: jest.Mock = jest.fn().mockImplementation((o: OptionElement) => o.test);
const mockOnSelect: jest.Mock = jest.fn().mockImplementation(() => {});

let component: ShallowWrapper<SelectFieldProps>;
let instance: SelectField;

describe('SelectField', () => {
  beforeEach(() => {
    component = shallow<SelectField>(
      <SelectField
        id="select-id"
        label="select-label"
        isRequired
        value={28}
        options={options}
        onRender={mockOnRender}
        onSelect={mockOnSelect}
      />,
    );
    instance = component.instance() as SelectField;
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  describe('FormControl', () => {
    it('should be rendered', () => {
      expect(component.find(FormControl)).toHaveLength(1);
    });

    it('should set the required to the isRequired prop', () => {
      expect(component.find(FormControl).prop('required')).toBeTruthy();
    });

    it('should set the required to the isRequired prop', () => {
      component.setProps({ isRequired: false });
      expect(component.find(FormControl).prop('required')).toBeFalsy();
    });
  });

  describe('InputLabel', () => {
    it('should be rendered', () => {
      expect(component.find(InputLabel)).toHaveLength(1);
    });

    it('should display the label prop', () => {
      expect(component.find(InputLabel).childAt(0).text()).toEqual('select-label');
    });

    it('should set the htmlFor prop to the id prop', () => {
      expect(component.find(InputLabel).prop('htmlFor')).toEqual('select-id');
    });
  });

  describe('Select', () => {
    it('should be rendered', () => {
      expect(component.find(Select)).toHaveLength(1);
    });

    it('should set the value to the value prop if provided', () => {
      expect(component.find(Select).prop('value')).toEqual(28);
    });

    it('should set the value to an empty string if not defined or not a finite number', () => {
      component.setProps({ value: NaN });
      expect(component.find(Select).prop('value')).toEqual('');
    });

    it('should set the onChange prop to the provided onChange method', () => {
      expect(component.find(Select).prop('onChange')).toEqual(instance.onChange);
    });
  });

  it('should render a MenuItem for each option', () => {
    expect(component.find(MenuItem)).toHaveLength(2);
  });

  describe('First Option', () => {
    let option: ShallowWrapper;
    beforeEach(() => {
      option = component.find(MenuItem).find(MenuItem).at(0);
    });

    it('should set the key as the id of the option', () => {
      expect(option.key()).toEqual('1');
    });

    it('should set the value prop as the id of the option', () => {
      expect(option.prop('value')).toEqual(1);
    });

    it('should call the onRender prop', () => {
      expect(mockOnRender).toHaveBeenCalledWith(option1);
    });

    it('should render the child as the value returned by the onRender prop, which is the test property of the option', () => {
      expect(option.childAt(0).text()).toEqual('test-1');
    });
  });

  describe('Second Option', () => {
    let option: ShallowWrapper;
    beforeEach(() => {
      option = component.find(MenuItem).find(MenuItem).at(1);
    });

    it('should set the key as the id of the option', () => {
      expect(option.key()).toEqual('2');
    });

    it('should set the value prop as the id of the option', () => {
      expect(option.prop('value')).toEqual(2);
    });

    it('should call the onRender prop', () => {
      expect(mockOnRender).toHaveBeenCalledWith(option2);
    });

    it('should render the child as the value returned by the onRender prop, which is the test property of the option', () => {
      expect(option.childAt(0).text()).toEqual('test-2');
    });
  });

  describe('onChange', () => {
    beforeEach(() => {
      component.find(Select).simulate('change', { target: { value: 2 } });
    });

    it('should call the onSelect method', () => {
      expect(mockOnSelect).toHaveBeenCalledWith(option2);
    });
  });
});
