import React from "react";
import "./List.css";

const ListItem = ({ children, active, onClick }) => {
  return (
    <li onClick={onClick} className={`list-item ${active && "active"}`}>
      {children}
    </li>
  );
};

export default ListItem;
