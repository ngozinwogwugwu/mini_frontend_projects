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
        </header>
        <ScooterTable />
      </div>
    );
  }
}

export default ScooterTableApp;
