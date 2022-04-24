import React from "react";
import "./EventCard.scss";
const EventCard = ({ type, number, onClick }) => {
  return (
    <div onClick={onClick} className={`event__card ${type}__background`}>
      <h3 className={"event__card__number"}>{number}</h3>{" "}
      <h6 className={"event__card__type"}>{type}</h6>
    </div>
  );
};

export default EventCard;
