import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import Button from "../../materials/Button/Button";
import Action from "./Action";
const { v4: uuid } = require("uuid");

const Actions = ({ project }) => {
  const [actions, setActions] = React.useState([
    { name: "action", id: uuid() },
    { name: "action", id: uuid() },
    { name: "action", id: uuid() },
    { name: "action", id: uuid() },
  ]);
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
      <div className="form__container" style={{ padding: "0px" }}>
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
