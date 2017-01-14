import React from 'react';
import Button from './Button.js';
import './Keypad.css';

const BUTTONS = {
  portrait: [
    ['AC', 'C', '<-', '+/-'],
    ['7', '8', '9','%'],
    ['4', '5', '6', '/'],
    ['1', '2', '3', 'x'],
    ['0', '000', '.', '-'],
    ['=', '+']
  ],
  landscape: [
    ['7', '8', '9', 'AC', 'C', '<-'],
    ['4', '5', '6', 'x', '/', '%'],
    ['1', '2', '3', '+', '-', '+/-'],
    ['0', '000', '.', '='],
  ]
};

export default (props) => {
  let buttons = props.display === 'landscape' ?  BUTTONS.landscape : BUTTONS.portrait;
  const handler = (btnText) => {
    props.onKeyPressed(btnText.toLowerCase());
  };
  return ( <div className="Keypad-container">{renderButtons(buttons, handler)}</div> );
}

function renderButtons(buttons, handler) {
  return buttons.map((buttonsRow, rowNumber) => renderButtonsRow(buttonsRow, rowNumber, handler));
}

function renderButtonsRow(row, rowNumber, handler) {
  return <div className="Keypad-row" key={`keypad-row-${rowNumber}`}>{row.map((btn, col) => renderButton(btn, col, rowNumber, handler))}</div>
}

function renderButton(button, col, row, handler) {
  const size = button === '=' ? 3 : 1;
  return <Button key={`Keypad-btn-${row}-${col}`} size={size} text={button} onClick={handler}/>
}
