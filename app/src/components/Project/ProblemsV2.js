import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import ProblemsDnd from "../Draggable/ProblemsDnd";
import { Context } from "../Context/Context";
import "./Project.css";

const ProblemesV2 = () => {
  const { problems } = React.useContext(Context);
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    var sum = 0;
    problems.forEach((prob) => (sum = sum + prob.tasks.length));
    setLength(sum);
  }, [problems, setLength]);

  const Content = () => {
    if (length === 0)
      return <h5 className="white__info">Aucun problème sur ce projet.</h5>;
    return <ProblemsDnd />;
  };
  return (
    <Accordion
      id={"problemes"}
      content={Content()}
      title={`Problèmes (${length})`}
    />
  );
};

export default ProblemesV2;
