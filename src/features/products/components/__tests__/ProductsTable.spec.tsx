/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */

import React, { ChangeEvent } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Switch } from '@material-ui/core';
import { Product } from '../../product';
import ProductsTable, { ProductsTableProps } from '../ProductsTable';

jest.mock('../ProductRow');

const product1: Product = {
  id: 1, name: 'product-name-1', dictionary: 2, price: 123,
};
const product2: Product = {
  id: 2, name: 'product-name-2', dictionary: 1, price: 321,
};
const products: Product[] = [product1, product2];

const changeEvent = { target: { value: '' } } as ChangeEvent<HTMLInputElement>;

let component: ShallowWrapper<ProductsTableProps>;
let instance: ProductsTable;

describe('ProductsTable', () => {
  beforeEach(() => {
    component = shallow<ProductsTableProps>(<ProductsTable
      products={products}
    />);
    instance = component.instance() as ProductsTable;
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  describe('Switch', () => {
    it('should be rendered', () => {
      expect(component.find(Switch)).toHaveLength(1);
    });

    it('should have the onChange prop equals to the onSwitch method', () => {
      expect(component.find(Switch).prop('onChange')).toEqual(instance.onSwitch);
    });

    it('should have the checked prop equals to the state property isTransformDatasetEnabled', () => {
      component.setState({ isTransformDatasetEnabled: false });
      expect(component.find(Switch).prop('checked')).toBeFalsy();
      component.setState({ isTransformDatasetEnabled: true });
      expect(component.find(Switch).prop('checked')).toBeTruthy();
    });

    it('should call the onSwitch method when the field changes', () => {
      jest.spyOn(instance, 'onSwitch').mockImplementation();
      component.update();
      instance.forceUpdate();
      component.find(Switch).simulate('change', changeEvent);
      expect(instance.onSwitch).toHaveBeenCalled();
    });
  });

  describe('onSwitch', () => {
    it('should set the state with the checked value', () => {
      jest.spyOn(instance, 'setState').mockImplementation();
      instance.onSwitch(changeEvent, true);
      expect(instance.setState).toHaveBeenCalledWith({ isTransformDatasetEnabled: true });
    });
  });
});
