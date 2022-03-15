import React from "react";
import "./Home.css";
import logo from "../../assets/images/logo.png";

import { useNavigate } from "react-router";

const ClientItem = ({ client }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/client/${client.id}`)}
      className={"client__item"}
    >
      <div className={"client__item__name__container"}>
        <p>{client.name}</p>
        <img
          className={"client__item__logo"}
          src={logo}
          alt={`logo${client.id}`}
        />
      </div>
      <i className="gg-chevron-right"></i>
    </div>
  );
};

export default ClientItem;
