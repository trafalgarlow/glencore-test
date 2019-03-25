import React, { ReactNode, ChangeEvent } from 'react';
import {
  Paper, Table, TableHead, TableRow, TableCell, TableBody, Switch, InputLabel, Typography, Divider,
} from '@material-ui/core';
import { Product } from '../product';
import ProductRow from './ProductRow';
import './ProductsTable.scss';


export interface ProductsTableProps {
  products: Product[];
}

interface State {
  isTransformDatasetEnabled: boolean;
}

class ProductsTable extends React.PureComponent<ProductsTableProps, State> {
  state = { isTransformDatasetEnabled: false };

  onSwitch = (event: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    this.setState({ isTransformDatasetEnabled: checked });
  };

  render(): ReactNode {
    const { products } = this.props;
    const { isTransformDatasetEnabled } = this.state;

    return (
      <div className="row">
        <div className="col-12 text-center">
          <InputLabel>
            <Typography color="primary" variant="h6">Transform Dataset</Typography>
          </InputLabel>
          <Switch
            className="hvr-float-shadow"
            color="primary"
            checked={isTransformDatasetEnabled}
            onChange={this.onSwitch}
          />
        </div>
        <Divider className="col-12 content-divider extra-small" />
        <div className="col-12">
          <Paper className="overflow-auto">
            <Table>
              <colgroup>
                <col className="products-col-group-name" />
                <col className="products-col-group-dictionary" />
                <col className="products-col-group-price" />
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="secondary" className="table-header-text" variant="subtitle1">Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="secondary" className="table-header-text" variant="subtitle1">Color</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="secondary" className="table-header-text" variant="subtitle1">Price</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product: Product) => (
                  <ProductRow
                    isTransformed={isTransformDatasetEnabled}
                    key={product.id}
                    product={product}
                  />
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

export default ProductsTable;
