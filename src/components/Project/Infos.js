import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import Kanban from "../Draggable/Kanban";
const Infos = () => {
  const Content = () => {
    return <Kanban />;
  };
  return (
    <Accordion
      id={"infos"}
      content={Content()}
      title={"Infos (5)"}
    />
  );
};

export default Infos;
