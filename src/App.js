import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import './App.css';

import Common from './components/common';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Common />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
