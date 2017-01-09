import React from 'react';
import Screen from './Screen';
import Keypad from './Keypad';
import './Calc.css';


export default class Calc extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '0',
      expression: ''
    }
  }

  render() {
    return (
      <div className="Calc">
        <Screen input={this.state.input} expression={this.state.expression}/>
        <Keypad display="landscape"/>
      </div>
    );
  }
}
