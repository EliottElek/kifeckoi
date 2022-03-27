import React from "react";
import "./Chip.css";
import img from "../../assets/images/profilePic.jpg";
const Chip = ({ text, src }) => {
  return (
    <div className="chip__container">
      <span className="chip__container__name">{text}</span>
      <img alt="avatar" className="chip__container__image" src={img} />
    </div>
  );
};

export default Chip;
