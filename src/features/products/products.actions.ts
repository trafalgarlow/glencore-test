import { ProductToInsert } from './product';


enum ProductActionType {
  ADD = 'ADD_PRODUCT',
}

export interface ProductAction {
  type: ProductActionType;
  product: ProductToInsert;
}

export type AddProductActionType = (color: ProductToInsert) => ProductAction;

const addProductAction = (product: ProductToInsert): ProductAction => ({
  type: ProductActionType.ADD,
  product,
});

export {
  addProductAction,
  ProductActionType,
};
