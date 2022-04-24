import React from "react";
import "./Backdrop.scss";
const Backdrop = ({ children }) => {
  return <div className="backdrop">{children}</div>;
};
export default Backdrop;
