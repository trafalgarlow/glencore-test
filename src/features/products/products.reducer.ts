import { ArrayUtils } from 'utils';
import { ProductAction, ProductActionType } from './products.actions';
import { Product } from './product';


const productsReducer = (state: Product[] = [], action: ProductAction): Product[] => {
  switch (action.type) {
    case ProductActionType.ADD:
      return state.concat({ ...action.product, id: ArrayUtils.findNextId(state) });
    default:
      return state;
  }
};

export default productsReducer;
