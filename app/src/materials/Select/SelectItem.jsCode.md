import React from "react";
import "./SelectItem.css";
const SelectItem = ({ children, onClick }) => {
  return (
    <div className="dopdown_item" onClick={onClick}>
      {children}
    </div>
  );
};

export default SelectItem;
