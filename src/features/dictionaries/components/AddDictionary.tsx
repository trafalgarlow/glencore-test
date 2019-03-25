import React, {
  PureComponent, ReactNode, ContextType, Context,
} from 'react';
import { StringUtils, NumberUtils } from 'utils';
import { DictionaryToInsert } from '../dictionary';
import { DictionariesContext } from '../providers';
import { DictionariesContextValues } from '../providers/DictionariesContext';
import SaveDictionary from './SaveDictionary';

export interface AddDictionaryProps {
  onAdd: (dictionary: DictionaryToInsert) => void;
}

class AddDictionary extends PureComponent<AddDictionaryProps> {
  static contextType: Context<DictionariesContextValues> = DictionariesContext;

  context!: ContextType<typeof DictionariesContext>;

  isFromNotAvailable = (from: string): boolean => {
    const { isFromAvailable } = this.context;
    return !isFromAvailable(from);
  };

  isFromValid = (from: string): boolean => !StringUtils.isEmpty(from) && !this.isFromNotAvailable(from);

  isSubmitDisabled = (from: string, to: number): boolean => !this.isFromValid(from) || !NumberUtils.isValidId(to);

  onSubmit = (from: string, to: number): void => {
    const { onAdd } = this.props;
    const { addDictionary } = this.context;

    addDictionary({ from, to });
    onAdd({ from, to });
  };

  render(): ReactNode {
    return (
      <SaveDictionary
        isFromNotAvailable={this.isFromNotAvailable}
        isSubmitDisabled={this.isSubmitDisabled}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default AddDictionary;
