import React, { Component } from 'react';
import Radar from './components/Radar'

class App extends Component {
  render() {
    return (
        <Radar 
            categories = {[]}
            countries = {[]}
        />
    );
  }
}

export default App;