import productsReducer from '../products.reducer';
import { ProductActionType } from '../__mocks__/products.actions';
import { Product, ProductToInsert } from '../product';
import { ProductAction } from '../products.actions';

jest.mock('utils');
jest.mock('../products.actions');

describe('productsReducer', () => {
  it('should be a function', () => {
    expect(typeof productsReducer).toEqual('function');
  });

  it('should return the state if the action is not matched', () => {
    const product: object = {};
    const action: ProductAction = {
      type: ('' as ProductActionType),
      product: (product as Product),
    };
    expect(productsReducer([], action)).toEqual([]);
  });

  it('should return the state with the new product', () => {
    const product: ProductToInsert = { name: 'product', price: 10, dictionary: 1 };
    const action: ProductAction = {
      type: ProductActionType.ADD,
      product,
    };
    expect(productsReducer([], action)).toEqual([product]);
  });
});
