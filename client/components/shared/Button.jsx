import React from 'react';
import './button.css';

function Button({ className, ...props }) {
  return <button className={`${className} my-button`} {...props}></button>
}

export default Button;
