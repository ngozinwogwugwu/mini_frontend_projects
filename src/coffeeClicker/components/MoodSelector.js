import React, { Component } from 'react';
import { Radio, FormGroup, Row, Col } from 'react-bootstrap';

export default class MoodSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: null,
    };

    this.handleMoodChange = this.handleMoodChange.bind(this);
  }

  handleMoodChange(event) {
    // TODO: make sure to grab the mood from the props
    this.setState({'mood':event.target.value})
    this.props.onChange(event.target.value);
  }

  render () {
    return (
      <div>
        <br/><br/>
        <Row>
          <Col xsHidden md={4}></Col>
          <Col xs={12} md={4}>
            <FormGroup>
              <Radio name="radioGroup" value="happy" onChange={this.handleMoodChange} inline>
                <i className="fas fa-smile fa-3x" />
              </Radio>
              <Radio name="radioGroup" value="sleepy" onChange={this.handleMoodChange} inline>
                <i className="fas fa-meh fa-3x" />
              </Radio>
              <Radio name="radioGroup" value="sad" onChange={this.handleMoodChange} inline>
                <i className="fas fa-frown fa-3x" />
              </Radio>
              <Radio name="radioGroup" value="jittery" onChange={this.handleMoodChange} inline>
                <i className="fas fa-flushed fa-3x" />
              </Radio>
              <Radio name="radioGroup" value="overworked" onChange={this.handleMoodChange} inline>
                <i className="fas fa-dizzy fa-3x" />
              </Radio>
            </FormGroup>
          </Col>
          <Col xsHidden md={4}></Col>
        </Row>
        <Row>
          <Col xsHidden md={5}></Col>
          <Col xs={12} md={2}>
              <h3 style={{display: this.state.mood ? 'block' : 'none' }}>(Mood: {this.state.mood})</h3>
          </Col>
          <Col xsHidden md={4}></Col>
        </Row>
        <br/><br/>
      </div>
    );
  }

}
