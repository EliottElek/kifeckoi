import React, { useState, useRef } from "react";
import Chevron from "./Chevron";

import "./Accordion.scss";

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);

  function toggleAccordion(e) {
    e.stopPropagation();
    setActiveState(setActive === "" ? "active" : "");
    if (props.kanban) setHeightState(setActive === "active" ? "0px" : `80vh`);
    else
      setHeightState(
        setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
      );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  return (
    <div className="accordion__section" id={props?.id}>
      <div
        disabled={props.disabled}
        className={`accordion ${setActive}`}
        onClick={toggleAccordion}
      >
        <div className="accordion__title">{props.title}</div>
        <Chevron
          className={`${setRotate}`}
          width={10}
          fill={"var(--main-color)"}
        />
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion__content"
      >
        <div className="accordion__text">{props.content}</div>
      </div>
    </div>
  );
}

export default Accordion;
