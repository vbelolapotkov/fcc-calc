import React from 'react';
import './Button.css';

export default (props) => {
  const { text, onClick, size = 1 } = props;
  let handler = () => {
    const btnText = text;
    onClick(btnText);
  };
  return <button className={`Button size-${size}`} onClick={handler}>{text}</button>
}
