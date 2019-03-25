import React, { ReactNode } from 'react';
import { TableRow, TableCell, Typography } from '@material-ui/core';
import { Color } from '../color';


export interface ColorRowProps {
  color: Color;
}

class ColorRow extends React.PureComponent<ColorRowProps> {
  render(): ReactNode {
    const { color: { name } } = this.props;

    return (
      <TableRow className="hvr-fade">
        <TableCell component="th" scope="row">
          <Typography variant="body2" className="break-text">{name}</Typography>
        </TableCell>
      </TableRow>
    );
  }
}

export default ColorRow;
