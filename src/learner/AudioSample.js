import React from 'react';
import Button from '@material-ui/core/Button';

class AudioSample extends React.Component {
  render() {
    return (
      <audio
        controls
        src={this.props.audioSource}>
      </audio>
    );
  }
}

export default AudioSample;
