import React from "react";
import "./AdvancedNavBar.css";

const DropDownMenuItem = ({
  children,
  leftIcon,
  rightIcon,
  goToMenu,
  setActiveMenu,
}) => {
  return (
    <button
      className="dropdown-item"
      onClick={() => goToMenu && setActiveMenu(goToMenu)}
    >
      <span className="icon-left">{leftIcon}</span>
      {children}
      <span className="icon-right">{rightIcon}</span>
    </button>
  );
};

export default DropDownMenuItem;
