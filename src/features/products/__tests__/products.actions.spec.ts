import { addProductAction, ProductActionType } from '../products.actions';
import { ProductToInsert } from '../product';

describe('addProductAction', () => {
  it('should be a function', () => {
    expect(typeof addProductAction).toEqual('function');
  });

  it('should return the add action', () => {
    const product: ProductToInsert = { name: 'product-1', price: 10, dictionary: 2 };
    expect(addProductAction(product)).toEqual({
      type: ProductActionType.ADD,
      product,
    });
  });
});
