import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import ActionsDnd from "../Draggable/ActionsDnd";
import { Context } from "../Context/Context";
import "./Project.css";

const ActionsV2 = () => {
  const { actions } = React.useContext(Context);
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    var sum = 0;
    actions.forEach((action) => (sum = sum + action.tasks.length));
    setLength(sum);
  }, [actions, setLength]);

  const Content = () => {
    if (length === 0)
      return <h5 className="white__info">Aucune action sur ce projet.</h5>;
    return <ActionsDnd />;
  };
  return (
    <Accordion
      id={"actions"}
      content={Content()}
      title={`Actions (${length})`}
    />
  );
};

export default ActionsV2;
