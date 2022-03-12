import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import Actions from "./Actions";
const Livrables = () => {
  return (
    <Accordion disabled id={"livrables"} content={<Actions />} title={"Livrables (0)"} />
  );
};

export default Livrables;
