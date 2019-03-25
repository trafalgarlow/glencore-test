export enum ProductActionType {
  ADD = 'ADD_PRODUCT',
};

export const addProductAction = jest.fn().mockReturnValue('add-product-action');
