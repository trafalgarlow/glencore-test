import React, { ReactNode, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreType } from 'store/store';
import { DictionariesContext } from 'features/dictionaries/providers';
import { DictionariesContextValues } from 'features/dictionaries/providers/DictionariesContext';
import { Product, ProductToInsert } from '../product';
import { ProductAction, addProductAction, AddProductActionType } from '../products.actions';
import ProductsContext, { ProductsContextValues } from './ProductsContext';


interface StateProps {
  products: Product[];
}

interface DispatcherProps {
  addProduct: AddProductActionType;
}

export interface ProductsContextProviderProps extends StateProps, DispatcherProps {
  children: ReactNode;
}

export class ProductsContextProviderUnconnected extends PureComponent<ProductsContextProviderProps> {
  getContextValue = (dictionariesContextValues: DictionariesContextValues): ProductsContextValues => {
    const { products, addProduct } = this.props;
    const { getDictionaryById, getDictionaryColor } = dictionariesContextValues;

    return {
      products,
      addProduct,
      getProductDictionary: getDictionaryById,
      getProductColor: getDictionaryColor,
    };
  };

  render(): ReactNode {
    const { children } = this.props;

    return (
      <DictionariesContext.Consumer>
        {
          (dictionariesContextValues: DictionariesContextValues) => (
            <ProductsContext.Provider value={this.getContextValue(dictionariesContextValues)}>
              {children}
            </ProductsContext.Provider>
          )
        }
      </DictionariesContext.Consumer>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = ({ products }: StoreType): StateProps => ({ products });
/* istanbul ignore next */
const mapDispatchToProps = (
  dispatch: Dispatch<ProductAction>,
): DispatcherProps => ({ addProduct: (product: ProductToInsert): ProductAction => dispatch(addProductAction(product)) });
/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(ProductsContextProviderUnconnected);
