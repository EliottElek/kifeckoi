import React from "react";
import "./Button.css";
const Button = ({
  children,
  reversed,
  style,
  onClick,
  disabled,
  type,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={
        reversed
          ? `button__reversed ${className}`
          : `button__versed ${className}`
      }
    >
      {children}
    </button>
  );
};

export default Button;
