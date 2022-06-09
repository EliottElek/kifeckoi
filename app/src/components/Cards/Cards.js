import React from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../Context/Context";
import "./Cards.scss";
const Card = ({ children, to, pointer }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      <div
        className="cards__container__dashboard__card"
        style={{ cursor: pointer ? "pointer" : "default" }}
      >
        {children}
      </div>
    </NavLink>
  );
};
const Cards = ({ clients }) => {
  const { user } = React.useContext(Context);
  return (
    <div className="cards__container__dashboard">
      <Card to={"/projects"} pointer>
        <span className="cards__container__dashboard__card__title">
          Projets
        </span>
        <span className="cards__container__dashboard__card__number">
          {user?.projects?.length}
        </span>
      </Card>
      <Card to={"/clients"} pointer>
        <span className="cards__container__dashboard__card__title">
          Clients
        </span>
        <span className="cards__container__dashboard__card__number">
          {clients?.length}
        </span>
      </Card>
      <Card to={"/"}>
        <span className="cards__container__dashboard__card__title">
          Évènements attribués
        </span>
        <span className="cards__container__dashboard__card__number">
          {user?.events?.length}
        </span>
      </Card>
      <Card to={"/"}>
        <span className="cards__container__dashboard__card__title">
          Commentaires
        </span>
        <span className="cards__container__dashboard__card__number">
          {user?.comments?.length}
        </span>
      </Card>
    </div>
  );
};

export default Cards;
