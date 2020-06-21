import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import Routes from './routes';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
