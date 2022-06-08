import React from "react";
import { useNavigate, useParams } from "react-router";
import "./Cards.scss";
import { useQuery } from "@apollo/client";
import { FIND_EVENTS_BY_PROJECT_ID } from "../../../graphql/queries";
import Progress from "../../../materials/Progress/Progress";
const Card = ({ children, onClick, pointer }) => {
  return (
    <div
      onClick={onClick}
      className="cards__container__global__card"
      style={{ cursor: pointer ? "pointer" : "default" }}
    >
      {children}
    </div>
  );
};
const Cards = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [actions, setActions] = React.useState();
  const [infos, setInfos] = React.useState();
  const [problems, setProblems] = React.useState();
  const [decisions, setDecisions] = React.useState();
  const [risks, setRisks] = React.useState();
  const [deliverables, setDeliverables] = React.useState();

  useQuery(FIND_EVENTS_BY_PROJECT_ID, {
    variables: { id: id, type: "Action" },
    onCompleted: (data) => {
      setActions(data.findEventsByProjectId);
    },
  });
  useQuery(FIND_EVENTS_BY_PROJECT_ID, {
    variables: { id: id, type: "Info" },
    onCompleted: (data) => {
      setInfos(data.findEventsByProjectId);
    },
  });
  useQuery(FIND_EVENTS_BY_PROJECT_ID, {
    variables: { id: id, type: "Problem" },
    onCompleted: (data) => {
      setProblems(data.findEventsByProjectId);
    },
  });
  useQuery(FIND_EVENTS_BY_PROJECT_ID, {
    variables: { id: id, type: "Decision" },
    onCompleted: (data) => {
      setDecisions(data.findEventsByProjectId);
    },
  });
  useQuery(FIND_EVENTS_BY_PROJECT_ID, {
    variables: { id: id, type: "Risk" },
    onCompleted: (data) => {
      setRisks(data.findEventsByProjectId);
    },
  });
  useQuery(FIND_EVENTS_BY_PROJECT_ID, {
    variables: { id: id, type: "Deliverable" },
    onCompleted: (data) => {
      setDeliverables(data.findEventsByProjectId);
    },
  });
  return (
    <div className="cards__container__global">
      <Card onClick={() => navigate(`/project/${id}/actions`)} pointer>
        <span className="cards__container__global__card__title">Actions</span>
        {!actions ? (
          <Progress />
        ) : (
          <span className="cards__container__global__card__number">
            {actions?.length}
          </span>
        )}
      </Card>
      <Card onClick={() => navigate(`/project/${id}/infos`)} pointer>
        <span className="cards__container__global__card__title">Infos</span>
        {!actions ? (
          <Progress />
        ) : (
          <span className="cards__container__global__card__number">
            {infos?.length}
          </span>
        )}
      </Card>
      <Card onClick={() => navigate(`/project/${id}/decisions`)} pointer>
        <span className="cards__container__global__card__title">Décisions</span>
        {!actions ? (
          <Progress />
        ) : (
          <span className="cards__container__global__card__number">
            {decisions?.length}
          </span>
        )}
      </Card>
      <Card onClick={() => navigate(`/project/${id}/risks`)} pointer>
        <span className="cards__container__global__card__title">Risques</span>
        {!actions ? (
          <Progress />
        ) : (
          <span className="cards__container__global__card__number">
            {risks?.length}
          </span>
        )}
      </Card>
      <Card onClick={() => navigate(`/project/${id}/problems`)} pointer>
        <span className="cards__container__global__card__title">Problèmes</span>
        {!actions ? (
          <Progress />
        ) : (
          <span className="cards__container__global__card__number">
            {problems?.length}
          </span>
        )}
      </Card>
      <Card onClick={() => navigate(`/project/${id}/deliverables`)} pointer>
        <span className="cards__container__global__card__title">Livrables</span>
        {!actions ? (
          <Progress />
        ) : (
          <span className="cards__container__global__card__number">
            {deliverables?.length}
          </span>
        )}
      </Card>
    </div>
  );
};

export default Cards;
