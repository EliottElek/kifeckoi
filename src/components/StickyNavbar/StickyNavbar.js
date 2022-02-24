import React from "react";
import "./StickyNavbar.css";
const StickyNavbar = ({ children }) => {
  return <div className="stickynavbar__container">{children}</div>;
};

export default StickyNavbar;
