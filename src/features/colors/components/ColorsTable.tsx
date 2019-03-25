import React, { ReactNode } from 'react';
import {
  Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography,
} from '@material-ui/core';
import { Color } from '../color';
import ColorRow from './ColorRow';


export interface ColorsTableProps {
  colors: Color[];
}

class ColorsTable extends React.PureComponent<ColorsTableProps> {
  render(): ReactNode {
    const { colors } = this.props;

    return (
      <Paper className="overflow-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="secondary" className="table-header-text" variant="subtitle1">Name</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colors.map(c => <ColorRow key={c.id} color={c} />)}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default ColorsTable;
