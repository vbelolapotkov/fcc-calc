import React, { Component } from 'react';
import Calc from './components/Calc.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Calculator app</h1>
        </div>
        <div className="App-container">
          <Calc />
        </div>
        <div className="App-footer">
          Designed and Implemented by <a href="https://vbelolapotkov.github.io/">Vasily Belolapotkov</a>
        </div>
      </div>
    );
  }
}

export default App;
