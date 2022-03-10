import React from "react";
import "./List.css";

const ListItem = ({ children, active }) => {
  return <li className={`list-item ${active && "active"}`}>{children}</li>;
};

export default ListItem;
