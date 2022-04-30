import React from "react";
import "./Backdrop.scss";
const Backdrop = ({ children, onClick }) => {
  return (
    <div
      className="backdrop"
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
    >
      {children}
    </div>
  );
};
export default Backdrop;
