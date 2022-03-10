import React from "react";
import "./Switch.css";
const Switch = ({ onChange, on, disabled }) => {
  return (
    <>
      {!disabled ? (
        <label className="switch">
          <input type="checkbox" readOnly checked={on} onClick={() => onChange(!on)} />
          <span className="slider round"></span>
        </label>
      ) : (
        <label className="switch disabled">
          <input
            disabled
            type="checkbox"
            checked={on}
            readOnly
            onClick={() => onChange(!on)}
          />
          <span className="slider round disabled"></span>
          <div className="switch_disabled_bar disabled" />
        </label>
      )}
    </>
  );
};

export default Switch;
