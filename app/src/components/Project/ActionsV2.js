import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import ActionsDnd from "../Draggable/ActionsDnd";
import { Context } from "../Context/Context";
const ActionsV2 = () => {
  const { actions } = React.useContext(Context);
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    var sum = 0;
    actions.forEach((action) => (sum = sum + action.tasks.length));
    setLength(sum);
  }, [actions, setLength]);

  const Content = () => {
    return <ActionsDnd />;
  };
  return (
    <Accordion
      id={"Actions"}
      content={Content()}
      title={`Actions (${length})`}
    />
  );
};

export default ActionsV2;
