import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'markdown-to-jsx';

class Paragraph extends React.Component {
  render() {
    return (
      <div>
        <Table>
          <TableBody>
            {this.props.sentences.map((sentence) => (
              <TableRow key={"paragraph"+ this.props.paragraphId + "sentence" + sentence.id}>
                <TableCell>
                  <Typography
                    paragraph={true}
                    variant='h6'
                  >
                    <ReactMarkdown>
                      {sentence.french}
                    </ReactMarkdown>
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
