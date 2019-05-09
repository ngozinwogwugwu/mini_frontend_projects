import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

import MoodSelector from './components/MoodSelector'
// import CountrySelect from 'react-country-select';
import ZipCodeTextField from './components/ZipCodeTextField'

import coffeeImage from './assets/coffee-images/coffee.jpg'
import espressoImage from './assets/coffee-images/espresso.jpg'
import herbalTeaImage from './assets/coffee-images/herbal_tea.jpg'
import latteImage from './assets/coffee-images/latte.jpg'
import mochaImage from './assets/coffee-images/mocha.jpg'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class CoffeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: null,
      mood: null,
      textToDisplay: null,
      temperature: null,
      image: null
    };
  }

  handleZipCodeValue = (value) => {
    this.setState({zipCode: value});
  }


  handleMoodChange = (event) => {
    this.setState({mood: event});
  }

  handleCoffeeFormSubmit = (event) => {
    this.setState({textToDisplay: 'What coffee should you get?'});
    this.runResponseAnimation();
  }

  runResponseAnimation = () => {
    this.getTemperature()
  }

  getTemperature() {
    var openweathermapUrl = 
      'http://api.openweathermap.org/data/2.5/weather' +
      '?zip=' + this.state.zipCode +
      '&APPID=1f43253a4757bc563036fed442803999' + // + this.state.weatherAppID +
      '&units=metric';

    return axios({
      method:'get',
      url:openweathermapUrl,
      responseType:'json'
    }).then((response) => {
      this.setState({
        temperature: response.data.main.temp,
        cityName: response.data.name
      });
      this.WriteOutCoffeeLogic();
    }).catch((error) => {
      console.log(error);

      // run coffee clicker in demo mode. Assume that it's a summer day in Boston.
      alert("Can't obtain weather information (check the developer panel for more details). Running in demo mode");
      this.setState({
        temperature: 20,
        cityName: 'Boston'
      });
      this.WriteOutCoffeeLogic();
    });
  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  WriteOutCoffeeLogic() {
    var whatToOrder = "";
    var image = null;
    var responseCopy = [];
    var tempF = Math.round((this.state.temperature * 1.8) + 32);
    responseCopy.push("It's " + Math.round(this.state.temperature) + 'C (' + tempF + 'F) outside. ');
    if (this.state.temperature < 18) {
      responseCopy.push("It's cold in " + this.state.cityName + " today!");
      responseCopy.push("Get something hot.");
    } else if (this.state.temperature > 18) {
      whatToOrder += "Iced "
      responseCopy.push("It's hot in " + this.state.cityName + " today!");
      responseCopy.push("Get something iced.");
    } else {
      responseCopy.push("What a nice day to be in " + this.state.cityName)
    }

    switch(this.state.mood) {
        case 'happy':
            whatToOrder += "Latte"
            responseCopy.push("Since you're happy...");
            responseCopy.push("you might as well have a latte.");
            image = latteImage;
            break;
        case 'sleepy':
            whatToOrder += "Espresso"
            responseCopy.push("You're sleepy?");
            responseCopy.push("Get some caffeine in you!");
            image = espressoImage;
            break;
        case 'sad':
            whatToOrder += "Mocha"
            responseCopy.push("You're sad?");
            responseCopy.push("Get something with chocolate.");
            image = mochaImage;
            break;
        case 'jittery':
            whatToOrder += "Herbal Tea"
            responseCopy.push("Stop drinking coffee if you feel jittery!");
            responseCopy.push("Have some tea.");
            image = herbalTeaImage;
            break;
        case 'overworked':
            whatToOrder += "Coffee"
            responseCopy.push("You're overworked?");
            responseCopy.push("It's gonna be a long day.");
            responseCopy.push("Have some plain coffee.");
            image = coffeeImage;
            break;
        default:
            whatToOrder += "Coffee"
            responseCopy.push("Have a coffee!");
    }
    responseCopy.push("Get one " + whatToOrder + "!");

    // play the 'animation' of conversational text
    this.setState({responseCopySize: responseCopy.length})
    responseCopy.forEach(async (response, i) => {
      await this.sleep(1300 * (i + 1));
      this.setState({textToDisplay: response});
      if (this.state.responseCopySize === (i+1)) {
        this.setState({image: image})
      }
    });
  }

  render () {
    return (
      <div id="container">
        <Paper>
          <form id="banner" className="banner" style={{display: this.state.textToDisplay ? 'none' : 'block' }}>
            <Row id="row">
              <Col id="col" xsHidden md={4}></Col>
              <Col id="col" xs={12} md={4}>
                <center>
                  <p>Enter your zip code and your mood!</p>
                </center>
              </Col>
              <Col id="col" xsHidden md={4}></Col>
            </Row>
              <Row id="row">
                <Col id="col" xsHidden md={4}></Col>
                <Col id="col" xs={12} md={3}>
                  <center>
                    <ZipCodeTextField label="zip code" placeholder="zip code" onValue={this.handleZipCodeValue} />
                    <i style={{display: this.state.zipCode ? 'block' : 'none' }} className="far fa-check-circle fa-2x" />
                  </center>
                </Col>
                <Col id="col" xsHidden md={3}></Col>
              </Row>
            <br/>
            <Row id="row">
              <center>
                <MoodSelector onChange={this.handleMoodChange}/>
              </center>
            </Row>
            <Row id="row">
              <Col id="col" xsHidden md={5}></Col>
              <Col id="col" xs={12} md={2}>
                <center>
                  <Button variant="contained" color="primary"
                    disabled={!this.state.zipCode || !this.state.mood}
                    onClick={this.handleCoffeeFormSubmit}
                  >Try it out</Button>
                </center>
              </Col>
              <Col id="col" xsHidden md={4}></Col>
            </Row>
          </form>
          <h1 style={{display: this.state.textToDisplay ? 'block' : 'none' }}>
            <center>{this.state.textToDisplay}</center>
          </h1>
          <center>
            <img height="500px" src={this.state.image} style={{display: this.state.image ? 'block' : 'none' }} alt="coffee to get" />
          </center>
          <br/>
          <br/>
        </Paper>
      </div>
    );
  }
}

export default CoffeeForm;