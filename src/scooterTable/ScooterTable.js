import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class SimpleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {scooters: []};
  }

  componentDidMount() {
    // initial scooter data grab
    this.getScooterData();

    // grab scooter data every ten seconds
    this.scooterGrabber = setInterval(
      () => this.getScooterData(),
      10000
    );
  }
  componentWillUnmount() {
    clearInterval(this.scooterGrabber);
  }

  getScooterData = () => {
    var coupScooterEndpoint = 'https://qc05n0gp78.execute-api.eu-central-1.amazonaws.com/prod/scooters'; 
    return axios({
      method:'get',
      url:coupScooterEndpoint,
      responseType:'json'
    }).then((response) => {
      this.setState({scooters: response.data.data.scooters});
      
    }).catch((error) => {
      alert('error grabbing scooter data');
      console.log(error);
    });
  }

  render = () =>  {
    return (
      <Paper>
        <Table>
          <div>
            <TableHead>
              <TableRow>
                <TableCell>model</TableCell>
                <TableCell> license plate</TableCell>
                <TableCell>energy level</TableCell>
                <TableCell numeric>distance to travel</TableCell>
                <TableCell>location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.scooters.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{row.model}</TableCell>
                    <TableCell>{row.license_plate}</TableCell>
                    <TableCell>{row.energy_level}</TableCell>
                    <TableCell>{row.distance_to_travel}</TableCell>
                    <TableCell>{row.location.lng}, {row.location.lng}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </div>
        </Table>
      </Paper>
    );
  }
}


export default withStyles(styles)(SimpleTable);