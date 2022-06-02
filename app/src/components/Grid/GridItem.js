import React from "react";
import "./Grid.scss";
const GridItem = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className="grid__item">
      {children}
    </div>
  );
};

export default GridItem;
