import React from 'react';
import ReactDOM from 'react-dom';
import AppProvider from './AppProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppProvider />, div);
  ReactDOM.unmountComponentAtNode(div);
});
