import "./kanban.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";
import Card from "./Card/Card";
import { Context } from "../Context/Context";
import Modal from "../../materials/Modal/Modal";
import Button from "../../materials/Button/Button";
import Select from "../../materials/Select/Select";
import SelectItem from "../../materials/Select/SelectItem/SelectItem";
import { v4 as uuidv4 } from "uuid";

const ActionsDnd = () => {
  const { risks, setRisks } = React.useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [riskSelected, setRiskselected] = useState();
  const [isActiveRisk, setIsActiveRisk] = useState(false);
  const [input, setInput] = useState("");
  const [inputName, setInputName] = useState("");

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = risks.findIndex(
        (e) => e.id === source.droppableId
      );
      const destinationColIndex = risks.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = risks[sourceColIndex];
      const destinationCol = risks[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      risks[sourceColIndex].tasks = sourceTask;
      risks[destinationColIndex].tasks = destinationTask;

      setRisks(risks);
    } else {
      const index = risks.findIndex((e) => e.id === source.droppableId);
      const items = Array.from(risks[index].tasks);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      risks[index].tasks = items;
      setRisks(risks);
    }
  };
  const add = () => {
    const newInfo = {
      id: uuidv4(),
      new: true,
    };
    newInfo["Item description *"] = input;
    newInfo["Accountable (RACI)  *"] = inputName;
    risks[riskSelected.id - 1].tasks.push(newInfo);
    setInput("");
    setInputName("");
    setRisks(risks);
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban">
          {risks.map((section, i) => (
            <Droppable key={section.id} droppableId={section.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  className={`kanban__section orange__back`}
                  ref={provided.innerRef}
                >
                  <h2 className={`kanban__section__title`}>
                    {section.title} ({section.tasks.length})
                    {i === 0 && (
                      <button
                        onClick={() => setOpenModal(true)}
                        className={`kanban__section__title__button`}
                      >
                        <i className="gg-add"></i>
                      </button>
                    )}
                  </h2>
                  <div className="kanban__section__content">
                    {section.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                          >
                            <Card
                              type={"risk"}
                              task={task}
                              dragging={snapshot.isDragging}
                              className={`card card__${i + 1}`}
                            >
                              {task["Item description *"]}
                              {task["Accountable (RACI)  *"] ? (
                                <span className="kanban__section__content__name__container">
                                  {task["Accountable (RACI)  *"]}{" "}
                                  <img
                                    alt="avatar"
                                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                  />
                                </span>
                              ) : (
                                <span className="kanban__section__content__name__container__not__attributed">
                                  Non attribuée
                                </span>
                              )}
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <Modal open={openModal} setOpen={setOpenModal}>
        <div className="modal__content__container">
          <h3>Ajouter un risque</h3>
          <p>Entrez la description du risque à ajouter</p>
          <textarea
            onClick={(e) => e.stopPropagation()}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form__textarea"
            placeholder={"Description du risque..."}
          />
          <Select
            defaultLabel={risks[0].title}
            style={{ margin: "4px" }}
            label={riskSelected?.title}
            width={200}
            height={10}
            isActive={isActiveRisk}
            setIsActive={setIsActiveRisk}
          >
            {risks.map((item) => (
              <SelectItem
                key={item.id}
                onClick={() => {
                  setRiskselected(item);
                  setIsActiveRisk(false);
                }}
              >
                {item.title}
              </SelectItem>
            ))}
          </Select>
          <p>Indiquez la personne à laquelle vous voulez attribuer le risque</p>
          <textarea
            onClick={(e) => e.stopPropagation()}
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="form__textarea"
            placeholder={"Saisir un nom..."}
          />
          <div style={{ display: "flex", gap: "12px" }}>
            <Button
              disabled={!riskSelected || input === "" ? true : false}
              reversed
              onClick={(e) => {
                add();
                setOpenModal(false);
              }}
            >
              Ajouter
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(false);
              }}
            >
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ActionsDnd;
