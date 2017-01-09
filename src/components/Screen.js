import React from 'react';
import './Screen.css';

export default (props) => (
  <div className="Screen-container">
    <div className="Screen-input">{props.input}</div>
    <div className="Screen-expression">{props.expression}</div>
  </div>
)
