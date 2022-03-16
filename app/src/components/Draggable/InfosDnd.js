import "./kanban.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";
import Card from "./Card/Card";
import { Context } from "../Context/Context";
import Modal from "../../materials/Modal/Modal";
import Button from "../../materials/Button/Button";
import Select from "../../materials/Select/Select";
import SelectItem from "../../materials/Select/SelectItem/SelectItem";
import { useMutation } from "@apollo/client";
import { CREATE_INFO, CHANGE_INFO_STATE } from "../../graphql/mutations";
import { useParams } from "react-router";
const InfosDnd = () => {
  const { infos, setInfos, setOpenAlert, setAlertContent } =
    React.useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [infoSelected, setInfoSelected] = useState();
  const [isActiveInfo, setIsActiveInfo] = useState(false);
  const [input, setInput] = useState("");
  const [inputName, setInputName] = useState("");
  const [createInfo] = useMutation(CREATE_INFO);
  const [changeInfoState] = useMutation(CHANGE_INFO_STATE);

  const { id } = useParams();
  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = infos.findIndex(
        (e) => e.id === source.droppableId
      );
      const destinationColIndex = infos.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = infos[sourceColIndex];
      const destinationCol = infos[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      infos[sourceColIndex].tasks = sourceTask;
      infos[destinationColIndex].tasks = destinationTask;
      console.log(result.draggableId);
      console.log(destinationCol?.title);

      try {
        await changeInfoState({
          variables: {
            infoId: result?.draggableId,
            newStatus: destinationCol?.title,
          },
        });
      } catch (err) {
        console.log(err);
      }
      setInfos(infos);
    } else {
      const index = infos.findIndex((e) => e.id === source.droppableId);
      const items = Array.from(infos[index].tasks);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      infos[index].tasks = items;
      setInfos(infos);
    }
  };
  const add = async () => {
    try {
      const newInfo = await createInfo({
        variables: {
          name: "Info",
          projectId: id,
          description: input,
          accountable: inputName,
          status: infoSelected.title,
        },
      });
      infos[infoSelected.id - 1].tasks.push({
        ...newInfo?.data?.createInfo,
        new: true,
      });
      setInput("");
      setInputName("");
      setInfos(infos);
    } catch (err) {
      setAlertContent({
        type: "warning",
        content: "Impossible d'ajouter l'info.",
      });
      console.log(err);
      setOpenAlert(true);
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban">
          {infos.map((section, i) => (
            <Droppable key={section.id} droppableId={section.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  className={`kanban__section violet__back`}
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
                              type={"info"}
                              task={task}
                              dragging={snapshot.isDragging}
                              className={`card card__${i + 1}`}
                            >
                              {task.description}
                              {task.accountable ? (
                                <span className="kanban__section__content__name__container">
                                  {task.accountable}{" "}
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
        <form className="modal__content__container" onSubmit={add}>
          <h3>Ajouter une info</h3>
          <p>Entrez la description de l'info à ajouter</p>
          <textarea
            onClick={(e) => e.stopPropagation()}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form__textarea"
            placeholder={"Description de l'info..."}
          />
          <Select
            defaultLabel={infos[0].title}
            style={{ margin: "4px" }}
            label={infoSelected?.title}
            width={200}
            height={10}
            isActive={isActiveInfo}
            setIsActive={setIsActiveInfo}
          >
            {infos.map((item) => (
              <SelectItem
                key={item.id}
                onClick={() => {
                  setInfoSelected(item);
                  setIsActiveInfo(false);
                }}
              >
                {item.title}
              </SelectItem>
            ))}
          </Select>
          <p>Indiquez la personne à laquelle vous voulez attribuer l'info</p>
          <textarea
            onClick={(e) => e.stopPropagation()}
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="form__textarea"
            placeholder={"Saisir un nom..."}
          />
          <div style={{ display: "flex", gap: "12px" }}>
            <Button
              disabled={!infoSelected || input === "" ? true : false}
              reversed
              onClick={(e) => {
                add();
                setOpenModal(false);
              }}
            >
              Ajouter
            </Button>
            <Button
              type="submit"
              onClick={(e) => {
                e.stopPropagation();
                add();
                setOpenModal(false);
              }}
            >
              Annuler
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default InfosDnd;
