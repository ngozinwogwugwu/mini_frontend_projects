import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import AudioSample from './AudioSample.js'

class VocabTable extends React.Component {
  render() {
    console.log("https://translate.google.com/translate_tts?ie=UTF-8&amp;q=le%20survivant&amp;tl=fr&amp;total=1&amp;idx=0&amp;textlen=12&amp;tk=238654.334185&amp;client=webapp&amp;prev=input")
    console.log(this.props.vocabList[0].audioSource)
    return (
      <Paper>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant='h6'>
                  French
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>
                  French Pronounciation
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>
                  Direct Translation
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>
                  Original English
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.vocabList.map((vocabSet) => (
              <TableRow hover>
                <TableCell>
                  <Typography variant='h6'>
                    {vocabSet.french}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>
                    <AudioSample
                      audioSource={vocabSet.audioSource}                      
                    />
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>
                    {vocabSet.directTranslation}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>
                    {vocabSet.english}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default VocabTable;
