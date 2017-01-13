import React from 'react';
import Calculator from '../lib/calc';
import Screen from './Screen';
import Keypad from './Keypad';
import './Calc.css';

export default class Calc extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '0',
      expression: ''
    };
    this._calc = new Calculator();
  }

  handleKeyPressed(key) {
    const { input, expression } = this._calc.pressKey(key);
    this.setState({ input, expression });
  }

  render() {
    return (
      <div className="Calc">
        <Screen input={this.state.input} expression={this.state.expression}/>
        <Keypad display="landscape" onKeyPressed={this.handleKeyPressed.bind(this)}/>
      </div>
    );
  }
}
