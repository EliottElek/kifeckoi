import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import Actions from "./Actions";
const Livrables = () => {
  return (
    <Accordion id={"livrables"} content={<Actions />} title={"Livrables (5)"} />
  );
};

export default Livrables;
