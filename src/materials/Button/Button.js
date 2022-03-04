import React from "react";
import "./Button.css";
const Button = ({ children, reversed, style, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={reversed ? "button__reversed" : "button__versed"}
    >
      {children}
    </button>
  );
};

export default Button;
