import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import RisksDnd from "../Draggable/RisksDnd";
import { Context } from "../Context/Context";
import "./Project.css";

const RisksV2 = () => {
  const { risks } = React.useContext(Context);
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    var sum = 0;
    risks.forEach((risk) => (sum = sum + risk.tasks.length));
    setLength(sum);
  }, [risks, setLength]);

  const Content = () => {
    if (length === 0)
      return <h5 className="white__info">Aucun risque sur ce projet.</h5>;
    return <RisksDnd />;
  };
  return (
    <Accordion
      id={"risques"}
      content={Content()}
      title={`Risques (${length})`}
    />
  );
};

export default RisksV2;
