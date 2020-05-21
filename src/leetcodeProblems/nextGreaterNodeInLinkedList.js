import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  textBox: {
    margin: theme.spacing.unit * 2,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing.unit * 5,
      width: '100%',
    },
  },
});

class NextGreaterNodeInLinkedList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      input1: "1,7,5,1,9,2,5,1",
      output: "",
    };
  }

  updateInput1 = (event) => {
    this.setState({input1: event.target.value})
  }

  nextLargerNodes = (event) => {
    const nodesArray = this.state.input1.split`,`.map(x=>+x)
    let nextBigNodes = []
    
    for (let i=0; i < nodesArray.length;  i++) {
        const remainingVals = nodesArray.slice(i+1);
        const biggerVals = remainingVals.filter((x) => {return x>nodesArray[i]})
        if (biggerVals.length === 0) {
            nextBigNodes.push(0)
        } else {
            nextBigNodes.push(biggerVals[0])
        }
    }
    this.setState({output: nextBigNodes});
  }


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper elevation={3}>
          <a href="https://leetcode.com/problems/next-greater-node-in-linked-list/">Next Greater Node In Linked List</a>: Find a smallest possible greater node in the linked list
          <br />

          <TextField
            id="standard-helperText"
            label="nums"
            className={classes.textBox}
            value={this.state.input1}
            onChange={this.updateInput1}
            helperText="array of integers"
          />

          <Button
            variant="contained"
            className={classes.textBox}
            color="primary"
            onClick={this.nextLargerNodes}
          >
            Compute!
          </Button>

          <TextField
            id="standard-read-only-input"
            label="Output"
            className={classes.textBox}
            value={this.state.output}
            InputProps={{
              readOnly: true,
            }}
            helperText="Array of smallest number in array to the left of current number that is bigger than current number"
          />

        </Paper>
      </div>
    );
  }
}

NextGreaterNodeInLinkedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NextGreaterNodeInLinkedList);
