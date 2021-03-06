import React from 'react';
import Calculator from '../lib/calc';
import {getKey} from '../lib/get-key';
import Screen from './Screen';
import Keypad from './Keypad';
import './Calc.css';

export default class Calc extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '0',
      expression: '',
      display: 'landscape'
    };
    this._calc = new Calculator();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDisplayMode.bind(this));
    window.addEventListener('keydown', this.handleKeyboardEvent.bind(this));
    this.updateDisplayMode();
  }

  updateDisplayMode() {
    const body = document.body;
    const display = body.clientWidth >= 480 || body.clientWidth > body.clientHeight ? 'landscape' : 'portrait';
    this.setState({display});
  };

  handleKeyboardEvent(event) {
    const key = getKey(event);
    if (!key) return;
    this.handleKeyPressed(key);
  }

  handleKeyPressed(key) {
    const { input, expression } = this._calc.pressKey(key);
    this.setState({ input, expression });
  }

  render() {
    return (
      <div className="Calc">
        <Screen input={this.state.input} expression={this.state.expression}/>
        <Keypad display={this.state.display} onKeyPressed={this.handleKeyPressed.bind(this)}/>
      </div>
    );
  }
}
