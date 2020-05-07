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

class TwoSum extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      input1: "2, 7, 11, 15",
      input2: "9",
      output: "",
    };
  }

  twoSum = (event) => {
    let nums = this.state.input1.split`,`.map(x=>+x)
    for (let i=0; i< nums.length; i++) {
      for (let j=i+1; j< nums.length; j++) {
        if (nums[i]+nums[j] === parseInt(this.state.input2)) {
          this.setState({output: nums[i] + ', ' + nums[j]});
          return
        }
      }
    }
    this.setState({output: ""});
  }

  updateInput1 = (event) => {
    this.setState({input1: event.target.value})
  }

  updateInput2 = (event) => {
    this.setState({input2: event.target.value})
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper elevation={3}>
          <a href="https://leetcode.com/problems/two-sum/">two sum</a>: If you have an array of ints, find the pair that gives you a goal int
          <br />

          <TextField
            id="standard-helperText"
            label="nums"
            className={classes.textBox}
            value={this.state.input1}
            onChange={this.updateInput1}
            helperText="array of non-negative integers"
          />

          <TextField
            id="standard-helperText"
            label="Sum"
            className={classes.textBox}
            value={this.state.input2}
            onChange={this.updateInput2}
            helperText="goal number"
          />

          <Button
            variant="contained"
            className={classes.textBox}
            color="primary"
            onClick={this.twoSum}
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
            helperText="two numbers to sum to goal number"
          />

        </Paper>
      </div>
    );
  }
}

TwoSum.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TwoSum);
