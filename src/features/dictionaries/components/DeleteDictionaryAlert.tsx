import React, {
  PureComponent, ReactNode, ContextType, Context,
} from 'react';
import { Typography } from '@material-ui/core';
import { Product } from 'features/products/product';
import { ProductsTable } from 'features/products/components';
import { Dictionary } from '../dictionary';
import { DictionariesContext } from '../providers';
import { DictionariesContextValues } from '../providers/DictionariesContext';

export interface DeleteDictionaryAlertProps {
  dictionary: Dictionary;
  products: Product[];
}

class DeleteDictionaryAlert extends PureComponent<DeleteDictionaryAlertProps> {
  static contextType: Context<DictionariesContextValues> = DictionariesContext;

  context!: ContextType<typeof DictionariesContext>;

  render(): ReactNode {
    const { dictionary: { from, to }, products } = this.props;
    const { getDictionaryColor } = this.context;

    const { name } = getDictionaryColor(to);

    return (
      <div>
        <Typography>You cannot delete the following dictionary:</Typography>
        <Typography>{`${from} - ${name}`}</Typography>
        <Typography>because it is associated with the following products:</Typography>
        <ProductsTable products={products} />
      </div>
    );
  }
}

export default DeleteDictionaryAlert;
