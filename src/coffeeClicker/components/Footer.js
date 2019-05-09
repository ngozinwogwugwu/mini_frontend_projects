import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class Footer extends Component {
  render () {
    return (
      <Panel>
        <center>
          <a href="https://www.linkedin.com/in/ngozinwogwugwu"> By Ngozi Nwogwugwu   </a>
          <a href="https://github.com/ngozinwogwugwu">   View code on GitHub!  </a>
          <a href="https://github.com/facebook/create-react-app">   React help   </a>
          <a href="https://templated.co/hielo">  CSS help from Templated   </a>
          <a href="https://www.pexels.com/">   Images from Pexel   </a>
          <a href="https://openweathermap.org/">   Weather from OpenWeatherMap </a>
        </center>
      </Panel>
    );
  }

}

export default Footer;