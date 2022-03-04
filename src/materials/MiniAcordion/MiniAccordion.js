import React, { useState, useRef } from "react";
import Chevron from "./Chevron";

import "./MiniAccordion.css";

function MiniAccordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  return (
    <div className="accordion__section__mini" id={props?.id}>
      <button
        className={`accordion ${setActive} mini`}
        onClick={toggleAccordion}
      >
        <div className="accordion__title__mini">{props.title}</div>
        <Chevron className={`${setRotate}`} width={10} fill={"white"} />
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

export default MiniAccordion;
