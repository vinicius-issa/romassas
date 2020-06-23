import React from 'react';
import { Container } from '@material-ui/core';

import Route from './routes'
import './App.css'
import Alert from './components/elements/Alert'
import AppBar from './components/elements/Menu'


const App: React.FC<{}> = ()=> {
  return (
    <div className="App">
      <AppBar />
      <Container >
        <Alert />
        <Route/>
      </Container>
    </div>
  );
}


export default App;
