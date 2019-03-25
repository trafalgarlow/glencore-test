import React, { ReactNode, PureComponent, ChangeEvent } from 'react';
import {
  FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';


export interface OptionElement {
  id: number;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

export interface SelectFieldProps {
  id: string;
  label: string;
  isRequired: boolean;
  value: number;
  options: OptionElement[];
  onRender: (item: OptionElement) => string;
  onSelect: (item: OptionElement) => void;
}

class SelectField extends PureComponent<SelectFieldProps> {
  static defaultProps = { value: NaN, isRequired: false };

  onChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>): void => {
    const { onSelect, options } = this.props;
    const found = options.find(({ id }) => id === +value) as OptionElement;
    onSelect(found);
  }

  render(): ReactNode {
    const {
      id, label, value, options, onRender, isRequired,
    } = this.props;

    return (
      <FormControl className="w-100" required={isRequired}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select
          value={Number.isFinite(value) ? value : ''}
          onChange={this.onChange}
          inputProps={{ id }}
        >
          {
            options.map(o => <MenuItem key={o.id} value={o.id}>{onRender(o)}</MenuItem>)
          }
        </Select>
      </FormControl>
    );
  }
}

export default SelectField;
