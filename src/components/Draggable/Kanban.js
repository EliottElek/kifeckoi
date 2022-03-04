import "./kanban.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import mockData from "./mockData";
import { useState } from "react";
import Card from "./Card/Card";
import Modal from "../../materials/Modal/Modal";
import Button from "../../materials/Button/Button";
import InputText from "../../materials/InputText/InputText";
import Select from "../../materials/Select/Select";
import SelectItem from "../../materials/Select/SelectItem/SelectItem";
import { v4 as uuidv4 } from "uuid";

const Kanban = () => {
  const [data, setData] = useState(mockData);
  const [openModal, setOpenModal] = useState(false);
  const [actionSelected, setActionSelected] = useState();
  const [isActiveAction, setIsActiveAction] = useState(false);
  const [input, setInput] = useState("");
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      setData(data);
    }
  };
  const add = () => {
    const newAction = {
      id: uuidv4(),
      title: input,
    };
    data[actionSelected.id - 1].tasks.push(newAction);
    setInput("");
    setData(data);
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban">
          {data.map((section, i) => (
            <Droppable key={section.id} droppableId={section.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  className={`kanban__section`}
                  ref={provided.innerRef}
                >
                  <div className="kanban__section__title">
                    <p>
                      {section.title} ({section.tasks.length})
                    </p>
                    {i === 0 && (
                      <button
                        className="kanban__section__title__button"
                        onClick={() => setOpenModal(true)}
                      >
                        <i className="gg-add"></i>
                      </button>
                    )}
                  </div>
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
                              opacity: snapshot.isDragging ? "1" : "1",
                            }}
                          >
                            <Card className={`card card__${i + 1}`}>
                              {task.title}
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
          <h3>Ajouter une action</h3>
          <p>Entrez le nom de l'action à ajouter</p>
          <InputText
            placeHolder="Le nom de l'action..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Select
            defaultLabel={data[0].title}
            style={{ margin: "4px" }}
            label={actionSelected?.title}
            width={200}
            height={10}
            isActive={isActiveAction}
            setIsActive={setIsActiveAction}
          >
            {data.map((item) => (
              <SelectItem
                key={item.id}
                onClick={() => {
                  setActionSelected(item);
                  setIsActiveAction(false);
                }}
              >
                {item.title}
              </SelectItem>
            ))}
          </Select>
          <div style={{ display: "flex", gap: "12px" }}>
            <Button
              disabled={!actionSelected || input === "" ? true : false}
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

export default Kanban;
