import React, { Component } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class MarkdownViewer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputFieldText: '# This is a H1  \n## This is a H2  \n###### This is a H6'
    }
  }

  handleTextFieldChange = (event) => {
    this.setState({inputFieldText:event.target.value});
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Paper padding="20">
              <MarkdownRenderer markdown={this.state.inputFieldText} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-textarea"
              label="Input Text"
              placeholder="Put your markdown here"
              multiline
              margin="normal"
              variant="outlined"
              fullWidth
              value={this.state.inputFieldText}
              onChange={this.handleTextFieldChange}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MarkdownViewer;
