import React from 'react';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';


class Paragraph extends React.Component {
  render() {
    return (
      <div>
        <Table>
          <TableBody>
            {this.props.sentences.map((sentence) => (
              <TableRow>
                <TableCell>
                  <Typography
                    paragraph={true}
                    variant='h6'
                  >
                    {sentence.french}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    paragraph={true}
                    variant='h6'
                  >
                    {sentence.english}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Paragraph;
