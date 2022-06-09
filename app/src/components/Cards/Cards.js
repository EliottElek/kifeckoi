import React from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/Context";
import "./Cards.scss";
const Card = ({ children, onClick, pointer }) => {
  return (
    <div
      onClick={onClick}
      className="cards__container__dashboard__card"
      style={{ cursor: pointer ? "pointer" : "default" }}
    >
      {children}
    </div>
  );
};
const Cards = ({ clients }) => {
  const navigate = useNavigate();

  const { user } = React.useContext(Context);
  return (
    <div className="cards__container__dashboard">
      <Card>
        <span className="cards__container__dashboard__card__title">
          Projets
        </span>
        <span className="cards__container__dashboard__card__number">
          {user?.projects?.length}
        </span>
      </Card>
      <Card onClick={() => navigate("/clients")} pointer>
        <span className="cards__container__dashboard__card__title">
          Clients
        </span>
        <span className="cards__container__dashboard__card__number">
          {clients?.length}
        </span>
      </Card>
      <Card>
        <span className="cards__container__dashboard__card__title">
          Évènements attribués
        </span>
        <span className="cards__container__dashboard__card__number">
          {user?.events?.length}
        </span>
      </Card>
      <Card>
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
