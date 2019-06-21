import React, { Component } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Markdown from './markdown';
import ReactMarkdown from 'markdown-to-jsx';

class MarkdownViewer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputFieldText:  "# A bunch of example markdown text\nhere's **some** normal *text*\n\n## Some python code\n```\nwhile (True):\n  print('FOR-E-VER')\n```\n\n## To-do list\n- [ ] walk dog\n- [x] get groceries\n\n## My weekly calendar\n| Monday | Tuesday | Wednesday | Thursday(20) | Friday (21) |\n| ----------- | ------------ | -------------- | ------------ | ----------- |\n| dinner with Kate | Guitar Lesson | board games | Shakespeare in the park | concert |\n| yoga | running | cook | yoga | running |\n"
    }
  }


  handleTextFieldChange = (event) => {
    this.setState({inputFieldText:event.target.value});
  }

  introText = '# Quick Markdown Viewer  \n I made this so that I can read the formatted text of my notes as I take them. \n\n ## Instructions:  \nJust write down your markdown in the left box and watch it appear in the right box :)';

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
              <ReactMarkdown key='intro'>
                {this.introText}
              </ReactMarkdown>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
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
          <Grid item xs={6}>
            <Paper padding="20">
              <ReactMarkdown key='results'>
                {this.state.inputFieldText}
              </ReactMarkdown>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default MarkdownViewer;
