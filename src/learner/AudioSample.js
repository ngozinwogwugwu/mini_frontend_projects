import React from 'react';

class AudioSample extends React.Component {
  render() {
    const audioFiles = require.context('./audioFiles', true);
    let audioFile = audioFiles('./' + this.props.audioSource);

    return (
      <audio controls>
        <source src={audioFile} type="audio/ogg" />
        <source src={audioFile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    )
  }
}

export default AudioSample;
