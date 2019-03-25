import React, { ReactNode, PureComponent, ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import { NumberUtils } from 'utils';
import { DEFAULT_CURRENCY } from 'contants';


interface Props {
  value: number;
  label: string;
  onChange: (value: number) => void;
}

class CurrencyTextField extends PureComponent<Props> {
  static defaultProps = { value: 0 };

  onChangeValue = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
    const { onChange } = this.props;
    onChange(NumberUtils.getCurrencyValueFromText(value));
  };

  render(): ReactNode {
    const { value, label } = this.props;

    return (
      <TextField
        className="w-100"
        label={label}
        value={NumberUtils.formatCurrency(value, DEFAULT_CURRENCY)}
        onChange={this.onChangeValue}
      />
    );
  }
}

export default CurrencyTextField;
