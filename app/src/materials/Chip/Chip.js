import React from "react";
import "./Chip.css";
import logo from "../../assets/images/logo.png";
const Chip = ({ text, src }) => {
  return (
    <div className="chip__container">
      <span className="chip__container__name">{text}</span>
      <img alt="avatar" className="chip__container__image" src={logo} />
    </div>
  );
};

export default Chip;
