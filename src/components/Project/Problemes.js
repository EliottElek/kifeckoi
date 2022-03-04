import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import Actions from "./Actions";
const Problemes = () => {
  return (
    <Accordion id={"problemes"} content={<Actions />} title={"Problèmes (5)"} />
  );
};

export default Problemes;
