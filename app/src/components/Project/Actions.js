import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import Button from "../../materials/Button/Button";
import Action from "./Action";
// import { Context } from "../Context/Context";
const { v4: uuid } = require("uuid");

const Actions = () => {
  const [actions, setActions] = React.useState([]);

  const Content = () => {
    const addAction = () => {
      const actionsBefore = [...actions];
      const newAction = {
        name: "action",
        id: uuid(),
        number: actions.length + 1,
      };
      actionsBefore.push(newAction);
      setActions(actionsBefore);
    };
    const removeAction = (actionToRemove) => {
      const actionsBefore = [...actions];
      console.log(actionToRemove);
      const newActions = actionsBefore.filter(
        (action) => action.id !== actionToRemove.id
      );
      setActions(newActions);
    };
    return (
      <div>
        {actions.map((action, i) => (
          <Action key={i} action={action} removeAction={removeAction} i={i} />
        ))}
        <Button
          style={{ marginTop: "20px", marginBottom: "40px" }}
          onClick={addAction}
          reversed
        >
          Ajouter une action +
        </Button>
      </div>
    );
  };
  return (
    <Accordion
      id={"actions"}
      content={Content()}
      title={`Actions (${actions.length})`}
    />
  );
};

export default Actions;
