import React from "react";
import "./List.scss";

const ListItem = ({ children, onClick }) => {
  return (
    <li onClick={onClick} className={`list-item`}>
      {children}
    </li>
  );
};

export default ListItem;
