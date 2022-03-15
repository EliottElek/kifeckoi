import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import DecisionsDnd from "../Draggable/DecisionsDnd";
import { Context } from "../Context/Context";
import "./Project.css";
const DecisionsV2 = () => {
  const { decisions } = React.useContext(Context);
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    var sum = 0;
    decisions.forEach((action) => (sum = sum + action.tasks.length));
    setLength(sum);
  }, [decisions, setLength]);

  const Content = () => {
    return <DecisionsDnd />;
  };
  return (
    <Accordion
      id={"decisions"}
      content={Content()}
      title={`Decisions (${length})`}
    />
  );
};

export default DecisionsV2;
