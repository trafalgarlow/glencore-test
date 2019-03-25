import React, { ReactNode, Context, ContextType } from 'react';
import {
  TableRow, TableCell, IconButton, Typography,
} from '@material-ui/core';
import { DeleteForever, Edit } from '@material-ui/icons';
import { WithConfirmDialogProps } from 'components/withConfirmDialog';
import { withAlertDialog, withConfirmDialog } from 'components';
import { WithAlertDialogProps } from 'components/withAlertDialog';
import { Dictionary } from '../dictionary';
import { DictionariesContext } from '../providers';
import { DictionariesContextValues } from '../providers/DictionariesContext';
import DeleteDictionaryAlert from './DeleteDictionaryAlert';
import DeleteDictionaryDialog from './DeleteDictionaryDialog';


export interface DictionaryRowProps extends WithConfirmDialogProps, WithAlertDialogProps {
  dictionary: Dictionary;
}

export class DictionaryRow extends React.PureComponent<DictionaryRowProps> {
  static contextType: Context<DictionariesContextValues> = DictionariesContext;

  context!: ContextType<typeof DictionariesContext>;

  onConfirmDelete = (): void => {
    const { dictionary } = this.props;
    const { removeDictionary } = this.context;

    removeDictionary(dictionary);
  };

  onDeleteDictionary = (): void => {
    const { confirmDialog, alertDialog, dictionary } = this.props;
    const { getAssociatedProducts } = this.context;
    const { id } = dictionary;

    const associatedProducts = getAssociatedProducts(id);
    if (associatedProducts.length) {
      alertDialog({
        title: 'Cannot delete the dictionary',
        content: <DeleteDictionaryAlert dictionary={dictionary} products={associatedProducts} />,
      });
    } else {
      confirmDialog({
        title: 'Confirm to delete the dictionary?',
        content: <DeleteDictionaryDialog dictionary={dictionary} />,
        onConfirm: this.onConfirmDelete,
      });
    }
  };

  onEditDictionary = (): void => {
    const { dictionary } = this.props;
    const { selectDictionary } = this.context;

    selectDictionary(dictionary);
  };

  render(): ReactNode {
    const { dictionary } = this.props;
    const { getDictionaryColor } = this.context;

    const color = getDictionaryColor(dictionary.to);

    return (
      <TableRow className="hvr-fade">
        <TableCell component="th" scope="row">
          <Typography variant="body2" className="row-dictionary-from break-text">{dictionary.from}</Typography>
        </TableCell>
        <TableCell className="break-text">
          <Typography variant="body2" className="row-dictionary-to break-text">{color.name}</Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton className="hvr-radial-out" aria-label="Delete" color="secondary" onClick={this.onDeleteDictionary}>
            <DeleteForever />
          </IconButton>
          <IconButton className="hvr-radial-out" aria-label="Edit" color="secondary" onClick={this.onEditDictionary}>
            <Edit />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

const WithAlertDialogComponent = withAlertDialog(DictionaryRow);
export default withConfirmDialog(WithAlertDialogComponent);
