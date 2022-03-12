import React, { useState, useRef } from "react";
import Chevron from "./Chevron";

import "./Accordion.css";

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);

  function toggleAccordion(e) {
    e.stopPropagation();
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  return (
    <div className="accordion__section" id={props?.id}>
      <button
        disabled={props.disabled}
        className={`accordion ${setActive}`}
        onClick={toggleAccordion}
      >
        <p className="accordion__title">{props.title}</p>
        <Chevron
          className={`${setRotate}`}
          width={10}
          fill={"var(--main-color)"}
        />
      </button>
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
