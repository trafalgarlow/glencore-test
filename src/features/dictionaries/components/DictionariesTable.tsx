import React, { ReactNode } from 'react';
import {
  Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography,
} from '@material-ui/core';
import { Dictionary } from '../dictionary';
import DictionaryRow from './DictionaryRow';


export interface DictionariesTableProps {
  dictionaries: Dictionary[];
}

export class DictionariesTable extends React.PureComponent<DictionariesTableProps> {
  render(): ReactNode {
    const { dictionaries } = this.props;

    return (
      <Paper className="overflow-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="secondary" className="table-header-text" variant="subtitle1">From</Typography>
              </TableCell>
              <TableCell>
                <Typography color="secondary" className="table-header-text" variant="subtitle1">To</Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              dictionaries.map(
                d => <DictionaryRow key={d.id} dictionary={d} />,
              )
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default DictionariesTable;
