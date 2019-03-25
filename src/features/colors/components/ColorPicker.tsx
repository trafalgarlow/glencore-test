import React, {
  PureComponent, ReactNode, Context, ContextType,
} from 'react';
import { SelectField } from 'components';
import { OptionElement } from 'components/SelectField';
import { Color } from '../color';
import { ColorsContext } from '../providers';
import { ColorsContextValues } from '../providers/ColorsContext';


export interface ColorPickerProps {
  value: number;
  onSelectColor: (color: Color) => void;
}

class ColorPicker extends PureComponent<ColorPickerProps> {
  static defaultProps = { value: NaN };
  static contextType: Context<ColorsContextValues> = ColorsContext;

  context!: ContextType<typeof ColorsContext>;

  onSelect = (el: OptionElement): void => {
    const { onSelectColor } = this.props;

    onSelectColor(el as Color);
  };

  render(): ReactNode {
    const { value } = this.props;
    const { colors } = this.context;

    return (
      <SelectField
        id="color-picker"
        label="Select Color"
        value={value}
        options={colors}
        onSelect={this.onSelect}
        onRender={item => item.name}
        isRequired
      />
    );
  }
}

export default ColorPicker;
