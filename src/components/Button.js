import React from 'react';
import './Button.css';

export default (props) => {
  const { text, onClick } = props;
  let handler = () => {
    const btnText = text;
    onClick(btnText);
  };
  return <button className="Button" onClick={handler}>{text}</button>
}
