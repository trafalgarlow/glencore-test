import React, { ProviderProps, ConsumerProps } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { DictionariesContextValues } from 'features/dictionaries/providers/DictionariesContext';
import { DictionariesContext } from 'features/dictionaries/providers';
import ProductsContext, { ProductsContextValues } from '../ProductsContext';
import { ProductsContextProviderUnconnected, ProductsContextProviderProps } from '../ProductsContextProvider';
import { Product } from '../../product';

jest.mock('../ProductsContext');
jest.mock('features/dictionaries/providers/DictionariesContext');
jest.mock('utils');

const product1: Product = {
  id: 1, name: 'product-1', price: 10, dictionary: 2,
};
const product2: Product = {
  id: 2, name: 'product-2', price: 20, dictionary: 1,
};
const products: Product[] = [product1, product2];

const mockAddProduct: jest.Mock = jest.fn().mockImplementation(() => {});

let component: ShallowWrapper<ProductsContextProviderProps>;
let dictionariesContextConsumer: ShallowWrapper<ConsumerProps<DictionariesContextValues>>;
let productsContextProvider: ShallowWrapper<ProviderProps<ProductsContextValues>>;

describe('ProductsContextProvider', () => {
  beforeEach(() => {
    component = shallow<ProductsContextProviderProps>(
      <ProductsContextProviderUnconnected
        products={products}
        addProduct={mockAddProduct}
      >
        content
      </ProductsContextProviderUnconnected>,
    );
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render the DictionariesContext.Consumer', () => {
    expect(component.find(DictionariesContext.Consumer)).toHaveLength(1);
  });

  describe('Context Provider', () => {
    beforeEach(() => {
      dictionariesContextConsumer = component.find(DictionariesContext.Consumer);
      productsContextProvider = dictionariesContextConsumer.dive().find(ProductsContext.Provider);
    });

    it('should be rendered', () => {
      expect(productsContextProvider).toHaveLength(1);
    });

    it('should render the content', () => {
      expect(productsContextProvider.childAt(0).text()).toEqual('content');
    });

    it('should provide the products', () => {
      expect(productsContextProvider.props().value.products).toEqual(products);
    });

    it('should provide the addProduct', () => {
      expect(productsContextProvider.props().value.addProduct).toEqual(mockAddProduct);
    });

    it('should provide the getProductDictionary', () => {
      expect(productsContextProvider.props().value.getProductDictionary).toEqual(expect.any(Function));
    });

    it('should provide the getProductColor', () => {
      expect(productsContextProvider.props().value.getProductColor).toEqual(expect.any(Function));
    });
  });
});
