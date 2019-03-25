import React, {
  PureComponent, ReactNode, Context, ContextType,
} from 'react';
import { Typography } from '@material-ui/core';
import { Dictionary } from '../dictionary';
import { DictionariesContext } from '../providers';
import { DictionariesContextValues } from '../providers/DictionariesContext';

export interface DeleteDictionaryDialogProps {
  dictionary: Dictionary;
}

class DeleteDictionaryDialog extends PureComponent<DeleteDictionaryDialogProps> {
  static contextType: Context<DictionariesContextValues> = DictionariesContext;

  context!: ContextType<typeof DictionariesContext>;

  render(): ReactNode {
    const { dictionary: { from, to } } = this.props;
    const { getDictionaryColor } = this.context;

    const { name } = getDictionaryColor(to);

    return (
      <div>
        <Typography>Do you really want to delete the following dictionary?</Typography>
        <Typography>{`${from} - ${name}`}</Typography>
      </div>
    );
  }
}

export default DeleteDictionaryDialog;
