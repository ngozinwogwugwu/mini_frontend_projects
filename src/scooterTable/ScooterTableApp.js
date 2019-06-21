import Link from '@material-ui/core/Link';
import React, { Component } from 'react';
import logo from './motorcycle-solid.svg';
import './ScooterApp.css';

import ScooterTable from './ScooterTable';

class ScooterTableApp extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} height="100px" alt="logo" />
          <h1 className="App-title">Scooter Table</h1>
          Grabs information from an endpoint from a
          <Link href="https://www.joincoup.com/en/berlin/how-it-works"> Coup Scooters </Link>
          endpoint to display their active scooter information. Updates every ten seconds
        </header>
        <br/><br/>
        <ScooterTable />
      </div>
    );
  }
}

export default ScooterTableApp;
