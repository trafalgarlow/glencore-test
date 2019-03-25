/* eslint-disable react/forbid-prop-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-object-literal-type-assertion */

import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PropTypes from 'prop-types';
import { ProductsContextValues } from 'features/products/providers/ProductsContext';
import { AddProduct, ProductsTable } from 'features/products/components';
import { Product } from 'features/products/product';
import HomeRoute from '../HomeRoute';

jest.mock('features/products/components');

const product1: Product = {
  id: 1, name: 'product-1', dictionary: 2, price: 111,
};
const product2: Product = {
  id: 2, name: 'product-2', dictionary: 1, price: 222,
};
const products: Product[] = [product1, product2];
const context: ProductsContextValues = { products } as ProductsContextValues;
(HomeRoute as any).contextTypes = { products: PropTypes.any };

let component: ShallowWrapper<{}>;

describe('HomeRoute', () => {
  beforeEach(() => {
    component = shallow<{}>(<HomeRoute />, { context: context as ProductsContextValues });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should the AddProduct', () => {
    expect(component.find(AddProduct)).toHaveLength(1);
  });

  describe('ProductsTable', () => {
    it('should be rendered', () => {
      expect(component.find(ProductsTable)).toHaveLength(1);
    });

    it('should have as products prop the products prop of the context', () => {
      expect(component.find(ProductsTable).prop('products')).toEqual(products);
    });
  });
});
