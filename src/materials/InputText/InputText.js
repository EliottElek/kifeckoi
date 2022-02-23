import React from "react";
import "./InputText.css";
const InputText = ({
  value,
  onChange,
  placeHolder,
  label,
  style,
  number,
  max,
  min,
}) => {
  if (number)
    return (
      <div className="input__text__container">
        <p className="input__text__label">{label}</p>
        <input
          type="number"
          max={max}
          min={min}
          className="input__text"
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
          style={style}
        />
      </div>
    );
  return (
    <div className="input__text__container">
      <p className="input__text__label">{label}</p>
      <input
        className="input__text"
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        style={style}
      />
    </div>
  );
};

export default InputText;
