import React, {
  PureComponent, ReactNode, Context, ContextType,
} from 'react';
import { Typography } from '@material-ui/core';
import { StringUtils } from 'utils';
import { FullScreenDialog } from 'components';
import { FullScreenDialogRenderProps } from 'components/FullScreenDialog';
import { Dictionary, DictionaryToInsert } from '../dictionary';
import { DictionariesContext } from '../providers';
import { DictionariesContextValues } from '../providers/DictionariesContext';
import SaveDictionary from './SaveDictionary';


export interface EditDictionaryProps {
  dictionary: Dictionary;
  onEdit: (dictionary: Dictionary, updatedDictionary: DictionaryToInsert) => void;
}

class EditDictionary extends PureComponent<EditDictionaryProps> {
  static contextType: Context<DictionariesContextValues> = DictionariesContext;

  context!: ContextType<typeof DictionariesContext>;

  hasBeenEdit = (editedFrom: string, editedTo: number): boolean => {
    const { dictionary: { from, to } } = this.props;
    return !StringUtils.areEquals(from, editedFrom) || editedTo !== to;
  };

  isFromValid = (editedFrom: string): boolean => !StringUtils.isEmpty(editedFrom) && !this.isFromNotAvailable(editedFrom);

  isFromNotAvailable = (editedFrom: string): boolean => {
    const { dictionary } = this.props;
    const { isFromAvailable } = this.context;
    return !isFromAvailable(editedFrom, dictionary.id);
  };

  isSubmitDisabled = (editedFrom: string, editedTo: number): boolean => !this.hasBeenEdit(editedFrom, editedTo)
    || !this.isFromValid(editedFrom);

  onSubmit = (close: () => void) => (from: string, to: number): void => {
    const { onEdit, dictionary } = this.props;
    const { updateDictionary } = this.context;

    close();
    updateDictionary({ ...{ from, to }, id: dictionary.id });
    onEdit(dictionary, { from, to });
  };

  onClose= (): void => {
    const { dictionary } = this.props;
    const { unselectDictionary } = this.context;

    unselectDictionary(dictionary);
  };

  render(): ReactNode {
    const { dictionary: { from, to } } = this.props;

    return (
      <FullScreenDialog
        title={<Typography variant="h6" color="inherit">{from}</Typography>}
        onClose={this.onClose}
      >
        {
          ({ close }: FullScreenDialogRenderProps) => (
            <SaveDictionary
              from={from}
              to={to}
              isFromNotAvailable={this.isFromNotAvailable}
              isSubmitDisabled={this.isSubmitDisabled}
              onSubmit={this.onSubmit(close)}
            />
          )
        }
      </FullScreenDialog>
    );
  }
}

export default EditDictionary;
