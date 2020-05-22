import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import AudioSample from './AudioSample.js'
import dicitonary1 from './dictionaries/Dictionary1.json'


class VocabRow extends React.Component {
  render() {
    const vocabInfo = dicitonary1[this.props.phrase]
    if (vocabInfo === undefined) {
      return (
        <div>
          {this.props.phrase} is not found in dictionary
        </div>
      )
    } else {
      return (
        <TableRow hover>
          <TableCell>
            <Typography variant='h6'>
              {this.props.phrase}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant='h6'>
              <AudioSample
                audioSource={vocabInfo.audioSource}
              />
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant='h6'>
              {vocabInfo.english}
            </Typography>
          </TableCell>
        </TableRow>
      );      
    }
  }
}

export default VocabRow;
