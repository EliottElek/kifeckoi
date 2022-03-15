import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import InfosDnd from "../Draggable/InfosDnd";
import { Context } from "../Context/Context";
import "./Project.css";

const ActionsV2 = () => {
  const { infos } = React.useContext(Context);
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    var sum = 0;
    infos.forEach((action) => (sum = sum + action.tasks.length));
    setLength(sum);
  }, [infos, setLength]);

  const Content = () => {
    return <InfosDnd />;
  };
  return (
    <Accordion id={"infos"} content={Content()} title={`Infos (${length})`} />
  );
};

export default ActionsV2;
