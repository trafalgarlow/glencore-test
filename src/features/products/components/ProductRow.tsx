import React, { ReactNode, ContextType, Context } from 'react';
import { TableRow, TableCell, Typography } from '@material-ui/core';
import { CurrencyLabel } from 'components';
import { Product } from '../product';
import { ProductsContext } from '../providers';
import { ProductsContextValues } from '../providers/ProductsContext';


export interface ProductRowProps {
  product: Product;
  isTransformed: boolean;
}

class ProductRow extends React.PureComponent<ProductRowProps> {
  static defaultProps = { isTransformed: false };
  static contextType: Context<ProductsContextValues> = ProductsContext;

  context!: ContextType<typeof ProductsContext>;

  render(): ReactNode {
    const { product, isTransformed } = this.props;
    const { getProductDictionary, getProductColor } = this.context;

    const { from, to } = getProductDictionary(product.dictionary);
    const { name } = getProductColor(to);

    return (
      <TableRow className="hvr-fade">
        <TableCell component="th" scope="row">
          <Typography variant="body2" className="break-text">{product.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" className="break-text">{(isTransformed ? name : from)}</Typography>
        </TableCell>
        <TableCell align="right">
          <CurrencyLabel value={product.price} />
        </TableCell>
      </TableRow>
    );
  }
}

export default ProductRow;
