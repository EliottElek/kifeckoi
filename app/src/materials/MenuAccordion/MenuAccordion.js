import React, { useState, useRef } from "react";
import Chevron from "./Chevron";

import "./MenuAccordion.scss";

function MenuAccordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__menu__icon");

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
      setActive === "active"
        ? "accordion__menu__icon"
        : "accordion__menu__icon rotate"
    );
  }

  React.useEffect(
    () => {
      if (props.defaultOpen) {
        setTimeout(() => {
          setActiveState(setActive === "" ? "active" : "");
          setHeightState(
            setActive === "active"
              ? "0px"
              : `${content?.current?.scrollHeight}px`
          );
          setRotateState(
            setActive === "active"
              ? "accordion__menu__icon"
              : "accordion__menu__icon rotate"
          );
        }, 300);
      }
      return () => {
        setActiveState(""); // This worked for me
        setRotateState('"accordion__menu__icon"');
        setHeightState("0px");
      };
    },
    // eslint-disable-next-line
    [props.kanban, props.defaultOpen]
  );
  return (
    <div className="accordion__menu__section" id={props?.id}>
      <div
        disabled={props.disabled}
        className={`accordion__menu ${setActive}`}
        onClick={toggleAccordion}
      >
        <div className="accordion__menu__title">{props.title}</div>
        <Chevron
          className={`${setRotate}`}
          width={10}
          fill={"var(--main-color)"}
        />
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion__menu__content"
      >
        <div className="accordion__menu__text">{props.content}</div>
      </div>
    </div>
  );
}

export default MenuAccordion;
