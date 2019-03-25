import React, {
  PureComponent, ReactNode, Context, ContextType,
} from 'react';
import { SelectField } from 'components';
import { OptionElement } from 'components/SelectField';
import { Dictionary } from '../dictionary';
import DictionariesContext, { DictionariesContextValues } from '../providers/DictionariesContext';


export interface DictionaryPickerProps {
  value: number;
  onSelectDictionary: (dictionary: Dictionary) => void;
}

class DictionaryPicker extends PureComponent<DictionaryPickerProps> {
  static defaultProps = { value: NaN };
  static contextType: Context<DictionariesContextValues> = DictionariesContext;

  context!: ContextType<typeof DictionariesContext>;

  onSelect = (el: OptionElement): void => {
    const { onSelectDictionary } = this.props;
    onSelectDictionary(el as Dictionary);
  };

  render(): ReactNode {
    const { value } = this.props;
    const { dictionaries } = this.context;

    return (
      <SelectField
        id="dictionary-picker"
        label="Select Dictionary"
        value={value}
        options={dictionaries}
        onSelect={this.onSelect}
        onRender={item => item.from}
        isRequired
      />
    );
  }
}

export default DictionaryPicker;
