import React from 'react';
import "./input.css";

function Input(props) {
  return (
    <input type="text" className="my-input" {...props}/>
  )
}

export default Input;