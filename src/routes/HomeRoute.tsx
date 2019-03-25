import React, {
  ReactNode, PureComponent, Context, ContextType,
} from 'react';
import { Divider } from '@material-ui/core';
import { AddProduct, ProductsTable } from 'features/products/components';
import ProductsContext, { ProductsContextValues } from 'features/products/providers/ProductsContext';


class HomeRoute extends PureComponent<{}> {
  static contextType: Context<ProductsContextValues> = ProductsContext;

  context!: ContextType<typeof ProductsContext>;

  render(): ReactNode {
    const { products } = this.context;

    return (
      <div>
        <AddProduct />
        <Divider className="content-divider" />
        <ProductsTable products={products} />
      </div>
    );
  }
}

export default HomeRoute;
