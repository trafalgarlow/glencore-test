import React, { PureComponent, ReactNode } from 'react';
import { Typography } from '@material-ui/core';
import { NumberUtils } from 'utils';
import { DEFAULT_CURRENCY } from 'contants';


interface Props {
  value: number;
  currency: string;
}

class CurrencyLabel extends PureComponent<Props> {
  static defaultProps = { currency: DEFAULT_CURRENCY };

  render(): ReactNode {
    const { value, currency } = this.props;
    return (
      <Typography variant="caption">
        {NumberUtils.formatCurrency(value, currency)}
      </Typography>
    );
  }
}

export default CurrencyLabel;
