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
import PracticeProblems from './leetcodeProblems/PracticeProblems.js'
import FrenchHarryPotter from './learner/FrenchHarryPotter.js'
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
            <Tab label="Harry Potter à L'École des Sorciers" />
            <Tab label="Markdown Viewer" />
            <Tab label="SQLite Header Viewer" />
            <Tab label="Coffee Clicker" />
            <Tab label="Scooter Table" />
            <Tab label="Practice Problems" />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <FrenchHarryPotter />
        }
        {value === 1 &&
          <MarkdownViewer />
        }
        {value === 2 &&
          <SqliteHeaderViewer />
        }
        {value === 3 &&
          <CoffeeApp />
        }
        {value === 4 &&
          <ScooterTableApp />
        }
        {value === 5 &&
          <PracticeProblems />
        }
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);