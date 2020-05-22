import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import VocabRow from './VocabRow.js'

class VocabTable extends React.Component {
  render() {
    return (
      <Paper>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant='h6'>
                  French
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>
                  Pronounciation
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>
                  English
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.vocabList.map((phrase) => (
              <VocabRow
                phrase={phrase}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default VocabTable;
