import React from 'react';
import ReactDOM from 'react-dom';
import MoodSelector from './MoodSelector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MoodSelector />, div);
  ReactDOM.unmountComponentAtNode(div);
});
