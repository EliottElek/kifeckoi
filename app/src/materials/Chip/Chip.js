import React from "react";
import "./Chip.css";
const Chip = ({ text, src }) => {
  return (
    <div className="chip__container">
      <span className="chip__container__name">{text}</span>
      <img alt="" className="chip__container__image" src={src} />
    </div>
  );
};

export default Chip;
