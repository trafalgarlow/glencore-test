/* eslint-disable react/forbid-prop-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-object-literal-type-assertion */

import React, { FormEvent, ChangeEvent } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { StringUtils, NumberUtils } from 'utils';
import { DictionaryPicker } from 'features/dictionaries/components';
import { CurrencyTextField } from 'components';
import { ProductsContextValues } from '../../providers/ProductsContext';
import { AddProduct, AddProductProps } from '../AddProduct';

jest.mock('features/dictionaries/components');
jest.mock('components');
jest.mock('utils');

const mockShow: jest.Mock = jest.fn().mockImplementation(() => {});
const mockHide: jest.Mock = jest.fn().mockImplementation(() => {});

const mockAddProduct: jest.Mock = jest.fn().mockImplementation(() => {});
const context: ProductsContextValues = { addProduct: mockAddProduct } as any;
(AddProduct as any).contextTypes = { addProduct: PropTypes.any };

const submitEvent = { preventDefault: () => {} } as FormEvent<HTMLFormElement>;
const changeEvent = { target: { value: 'new-product-name' } } as ChangeEvent<HTMLInputElement>;

let component: ShallowWrapper<AddProductProps>;
let instance: AddProduct;

describe('AddProduct', () => {
  beforeEach(() => {
    component = shallow<AddProductProps>(<AddProduct
      show={mockShow}
      hide={mockHide}
    />, { context: context as ProductsContextValues });
    instance = component.instance() as AddProduct;
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

    it('should have the onSubmit prop equals to the onAddProduct method', () => {
      expect(component.find('form').prop('onSubmit')).toEqual(instance.onAddProduct);
    });

    it('should call the onAddProduct method when the form is submit', () => {
      jest.spyOn(instance, 'onAddProduct').mockImplementation();
      component.update();
      instance.forceUpdate();
      component.find('form').simulate('submit', submitEvent);
      expect(instance.onAddProduct).toHaveBeenCalledWith(submitEvent);
    });
  });

  describe('Product Name Text Field', () => {
    it('should be rendered', () => {
      expect(component.find(TextField).at(0).prop('label')).toEqual('Product Name');
    });

    it('should have the onChange prop has the onChangeName method', () => {
      expect(component.find(TextField).at(0).prop('onChange')).toEqual(instance.onChangeName);
    });

    it('should call the onChangeName method when the field changes', () => {
      jest.spyOn(instance, 'onChangeName').mockImplementation();
      component.update();
      instance.forceUpdate();
      component.find(TextField).at(0).simulate('change', changeEvent);
      expect(instance.onChangeName).toHaveBeenCalledWith(changeEvent);
    });
  });

  describe('DictionaryPicker', () => {
    it('should be rendered', () => {
      expect(component.find(DictionaryPicker)).toHaveLength(1);
    });

    it('should have the onSelectDictionary prop equals to the onSelectDictionary prop', () => {
      expect(component.find(DictionaryPicker).prop('onSelectDictionary')).toEqual(instance.onSelectDictionary);
    });
  });

  describe('CurrencyTextField', () => {
    it('should be rendered', () => {
      expect(component.find(CurrencyTextField)).toHaveLength(1);
    });

    it('should have the onChange prop equals to the onChangePrice prop', () => {
      expect(component.find(CurrencyTextField).prop('onChange')).toEqual(instance.onChangePrice);
    });
  });

  describe('Button', () => {
    it('should be rendered', () => {
      expect(component.find(Button)).toHaveLength(1);
    });

    it('should have the disabled prop equals to the returning value of the isAddDisabled prop', () => {
      jest.spyOn(instance, 'isAddDisabled').mockReturnValue(false);
      component.update();
      instance.forceUpdate();
      expect(component.find(Button).prop('disabled')).toBeFalsy();
    });
  });

  describe('isAddDisabled', () => {
    it('should call the isEmpty method of StringUtils', () => {
      component.setState({ name: 'product-name' });
      instance.isAddDisabled();
      expect(StringUtils.isEmpty).toHaveBeenCalledWith('product-name');
    });

    it('should call the isValidId method of NumberUtils', () => {
      jest.spyOn(StringUtils, 'isEmpty').mockReturnValue(false);
      component.setState({ dictionary: 28 });
      instance.isAddDisabled();
      expect(NumberUtils.isValidId).toHaveBeenCalledWith(28);
    });

    it('should return true if the product name is not valid', () => {
      jest.spyOn(StringUtils, 'isEmpty').mockReturnValue(true);
      expect(instance.isAddDisabled()).toBeTruthy();
    });

    it('should return true if the product name is valid but the dictionary is not', () => {
      jest.spyOn(StringUtils, 'isEmpty').mockReturnValue(false);
      jest.spyOn(NumberUtils, 'isValidId').mockReturnValue(false);
      expect(instance.isAddDisabled()).toBeTruthy();
    });

    it('should return false if the product name is valid and so is the dictionary', () => {
      jest.spyOn(StringUtils, 'isEmpty').mockReturnValue(false);
      jest.spyOn(NumberUtils, 'isValidId').mockReturnValue(true);
      expect(instance.isAddDisabled()).toBeFalsy();
    });
  });

  describe('onAddProduct', () => {
    beforeEach(() => {
      component.setState({ name: 'product-name', dictionary: 28, price: 1234 });
      jest.spyOn(instance, 'setState').mockImplementation();
      instance.onAddProduct(submitEvent);
    });

    it('should call the addProduct method of context', () => {
      expect(mockAddProduct).toHaveBeenCalledWith({ name: 'product-name', dictionary: 28, price: 1234 });
    });

    it('should call the show prop', () => {
      expect(mockShow).toHaveBeenCalledWith({ content: 'Product "product-name" added correctly', autoHideDuration: 5000 });
    });

    it('should reset the state', () => {
      expect(instance.setState).toHaveBeenCalledWith({ name: '', dictionary: NaN, price: 0 });
    });
  });

  describe('onChangeName', () => {
    it('should set the product name in the state', () => {
      jest.spyOn(instance, 'setState').mockImplementation();
      instance.onChangeName(changeEvent);
      expect(instance.setState).toHaveBeenCalledWith({ name: 'new-product-name' });
    });
  });

  describe('onSelectDictionary', () => {
    it('should set the product dictionary in the state', () => {
      jest.spyOn(instance, 'setState').mockImplementation();
      instance.onSelectDictionary({ id: 11, from: 'from', to: 2 });
      expect(instance.setState).toHaveBeenCalledWith({ dictionary: 11 });
    });
  });

  describe('onChangePrice', () => {
    it('should set the product price in the state', () => {
      jest.spyOn(instance, 'setState').mockImplementation();
      instance.onChangePrice(9999);
      expect(instance.setState).toHaveBeenCalledWith({ price: 9999 });
    });
  });
});
