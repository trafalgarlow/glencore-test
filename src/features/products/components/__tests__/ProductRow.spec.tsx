/* eslint-disable react/forbid-prop-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-object-literal-type-assertion */

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Dictionary } from 'features/dictionaries/dictionary';
import { Color } from 'features/colors/color';
import { CurrencyLabel } from 'components';
import { Product } from '../../product';
import { ProductsContextValues } from '../../providers/ProductsContext';
import ProductRow, { ProductRowProps } from '../ProductRow';

jest.mock('components');

const color: Color = { id: 3, name: 'name-color' };
const dictionary: Dictionary = { id: 2, from: 'from-dictionary', to: 3 };
const product: Product = {
  id: 1, name: 'product-name', dictionary: 2, price: 123,
};

const mockGetProductDictionary: jest.Mock = jest.fn().mockReturnValue(dictionary);
const mockGetProductColor: jest.Mock = jest.fn().mockReturnValue(color);
const context: ProductsContextValues = {
  getProductDictionary: mockGetProductDictionary,
  getProductColor: mockGetProductColor,
} as any;
(ProductRow as any).contextTypes = {
  getProductDictionary: PropTypes.any,
  getProductColor: PropTypes.any,
};

let component: ShallowWrapper<ProductRowProps>;

describe('ProductRow', () => {
  beforeEach(() => {
    component = shallow<ProductRowProps>(<ProductRow
      product={product}
    />, { context: context as ProductsContextValues });
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render the product name', () => {
    expect(component.find(Typography).at(0).childAt(0).text()).toEqual('product-name');
  });

  it('should render the dictionary from if the isTransformed prop is false', () => {
    component.setProps({ isTransformed: false });
    expect(component.find(Typography).at(1).childAt(0).text()).toEqual('from-dictionary');
  });

  it('should render the color name if the isTransformed prop is true', () => {
    component.setProps({ isTransformed: true });
    expect(component.find(Typography).at(1).childAt(0).text()).toEqual('name-color');
  });

  describe('CurrencyLabel', () => {
    it('should be rendered', () => {
      expect(component.find(CurrencyLabel)).toHaveLength(1);
    });

    it('should have the value prop as the product price', () => {
      expect(component.find(CurrencyLabel).prop('value')).toEqual(123);
    });
  });
});
