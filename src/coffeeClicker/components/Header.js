import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

class Header extends Component {
  render () {
    return (
      <PageHeader>
        <center><i className="fas fa-coffee fa-1x"/> What Coffee Should I Get? <i className="fas fa-coffee fa-1x" /></center>
      </PageHeader>
    );
  }

}

export default Header;