import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SqliteHeaderViewer from './SqliteHeaderViewer.js'
import MarkdownViewer from './MarkdownViewer.js'
import CoffeeApp from './coffeeClicker/CoffeeApp.js'
import ScooterTableApp from './scooterTable/ScooterTableApp.js'
import './App.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class App extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Markdown Viewer" />
            <Tab label="SQLite Header Viewer" />
            <Tab label="Coffee Clicker" />
            <Tab label="Scooter Table" />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <MarkdownViewer />
        }
        {value === 1 &&
          <SqliteHeaderViewer />
        }
        {value === 2 &&
          <CoffeeApp />
        }
        {value === 3 &&
          <ScooterTableApp />
        }
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);