import React from 'react';
import { Container } from '@material-ui/core';

import Route from './routes'
import './App.css'
import Alert from './components/elements/Alert'



const App: React.FC<{}> = ()=> {
  return (
    <div className="App">
      <Container >
        <Alert />
        <Route/>
      </Container>
    </div>
  );
}


export default App;
