import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import App from './App';
import AppBar from './components/elements/Menu'
import { Provider } from 'react-redux';

import configStore from './store/storeConfig';

const store = configStore();

dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppBar />
       <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
