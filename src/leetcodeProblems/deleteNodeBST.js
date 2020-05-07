import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { DislayTree, arrayToTree, stringToArray} from './tree.js'


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

class DeleteNodeBST extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      input1: "5,3,6,2,4,null,7",
      input2: "3",
      output: arrayToTree([0]),
    };
  }

  attachNodeToEnd = (root, node) => {
    if (root === null) {
      return node
    }
    if (root.right === null) {
      root.right = node
      return root
    }
    if (root.left === null) {
      root.left = node
      return root
    }

    return this.attachNodeToEnd(root.left, node)
  }

  removeNode = (parent, isLeft) => {
    const node = isLeft ? parent.left : parent.right
    const newNode = this.attachNodeToEnd(node.left, node.right)

    if (isLeft) {
      parent.left = newNode
    } else {
      parent.right = newNode
    }
  }

  findAndRemoveNode = (root, value) => {
    if (root === null || root === undefined) {
      return null
    }
    if (root.value === value) {
      return root
    }

    // debugger;
    if (root.left.value === value) {
      this.removeNode(root, true)
      return
    }

    if (root.right.value === value) {
      this.removeNode(root, false)
      return
    }

    this.findAndRemoveNode(root.left, value)
    this.findAndRemoveNode(root.right, value)
  }

  deleteNode = event => {
    const rootNode = arrayToTree(stringToArray(this.state.input1))
    const valueToFind = parseInt(this.state.input2)
    this.findAndRemoveNode(rootNode, valueToFind)
    this.setState({output: rootNode});
  }

  updateInput1 = event => {
    this.setState({input1: event.target.value})
  }

  updateInput2 = event => {
    this.setState({input2: event.target.value})
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper elevation={3}>
          <a href="https://leetcode.com/problems/delete-node-in-a-bst/"> Delete Node in a BST</a>: (buggy)
          <br />
          <table>
            <tr>
              <th>
                <TextField
                  id="standard-helperText"
                  label="nums"
                  className={classes.textBox}
                  value={this.state.input1}
                  onChange={this.updateInput1}
                  helperText="array of non-negative integers"
                />
              </th>
              <th>
                <TextField
                  id="standard-helperText"
                  label="nums"
                  className={classes.textBox}
                  value={this.state.input2}
                  onChange={this.updateInput2}
                  helperText="node to remove"
                />
                <Button
                  variant="contained"
                  className={classes.textBox}
                  color="primary"
                  onClick={this.deleteNode}
                >
                  Remove
                </Button>
              </th>
              <th>
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
              </th>
            </tr>
            <tr>
              <th>
                <DislayTree
                  treeArray={stringToArray(this.state.input1)}
                />
              </th>
              <th></th>
              <th>
                <DislayTree
                  tree={this.state.output}
                />
              </th>
            </tr>
          </table>
        </Paper>
      </div>
    );
  }
}

DeleteNodeBST.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteNodeBST);
