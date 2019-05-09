import React from 'react';
import ReactDOM from 'react-dom';
import ZipCodeTextField from './ZipCodeTextField';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ZipCodeTextField />, div);
  ReactDOM.unmountComponentAtNode(div);
});
