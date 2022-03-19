import "./kanban.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";
import Card from "./Card/Card";
import { Context } from "../Context/Context";
import Modal from "../../materials/Modal/Modal";
import Button from "../../materials/Button/Button";
import Select from "../../materials/Select/Select";
import SelectItem from "../../materials/Select/SelectItem/SelectItem";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_ACTIONS_BY_PROJECT_ID } from "../../graphql/queries";
import { CREATE_ACTION, CHANGE_ACTION_STATE } from "../../graphql/mutations";
import rawActions from "../../rawActions";
import { useParams } from "react-router";
import AutoCompleteUsers from "./AutoCompleteUsers";
import Avatars from "./Card/Avatars";
const ActionsDnd = ({ setLength, length }) => {
  const {
    actions,
    currentProject,
    setCurrentProject,
    setActions,
    setOpenAlert,
    setAlertContent,
  } = React.useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAcountables, setSelectedAccountables] = React.useState([]);
  const [actionSelected, setActionSelected] = useState();
  const [actionData, setActionData] = React.useState([]);
  const [isActiveAction, setIsActiveAction] = useState(false);
  const [input, setInput] = useState("");
  const [createAction] = useMutation(CREATE_ACTION);
  const [changeActionState] = useMutation(CHANGE_ACTION_STATE);
  const { id } = useParams();

  const dataActions = useQuery(FIND_ACTIONS_BY_PROJECT_ID, {
    variables: { id: id },
  });
  React.useEffect(() => {
    if (dataActions?.data) {
      setActionData([...dataActions?.data?.findActionsByProjectId]);
    }
  }, [setActionData, dataActions?.data]);

  React.useEffect(() => {
    const actionsFinal = [...rawActions];
    const actionsData = [...actionData];
    actionsData?.forEach((action) => {
      const index = actionsFinal.findIndex((ac) => ac.title === action.status);
      if (index !== -1) actionsFinal[index].tasks.push(action);
    });
    setActions(actionsFinal);
    console.log(actionsFinal);
  }, [actionData, setActions]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = actions.findIndex(
        (e) => e.id === source.droppableId
      );
      const destinationColIndex = actions.findIndex(
        (e) => e.id === destination.droppableId
      );

      const sourceCol = actions[sourceColIndex];
      const destinationCol = actions[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      actions[sourceColIndex].tasks = sourceTask;
      actions[destinationColIndex].tasks = destinationTask;
      try {
        await changeActionState({
          variables: {
            actionId: result?.draggableId,
            newStatus: destinationCol?.title,
          },
        });
      } catch (err) {
        console.log(err);
      }
      setActions([...actions]);
      currentProject.actions = [...actions];
      setCurrentProject(currentProject);
    } else {
      const index = actions.findIndex((e) => e.id === source.droppableId);
      const items = Array.from(actions[index].tasks);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      actions[index].tasks = items;
      setActions([...actions]);
      currentProject.actions = [...actions];
      setCurrentProject(currentProject);
    }
  };
  const add = async () => {
    const ArrayOfIds = selectedAcountables.map((acc) => acc.id);
    console.log(ArrayOfIds);
    try {
      const newAction = await createAction({
        variables: {
          name: "Action",
          projectId: id,
          description: input,
          accountables: ArrayOfIds,
          status: actionSelected.title,
        },
      });
      actions[actionSelected.id - 1].tasks.push({
        ...newAction?.data?.createAction,
        new: true,
      });
      setInput("");
      setActions([...actions]);
      currentProject.actions = [...actions];
      setCurrentProject(currentProject);
      setLength(length + 1);
    } catch (err) {
      setAlertContent({
        type: "warning",
        content: "Impossible d'ajouter l'action.",
      });
      console.log(err);
      setOpenAlert(true);
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban">
          {actions?.map((section, i) => (
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
                              type={"action"}
                              task={task}
                              dragging={snapshot.isDragging}
                              className={`card card__${i + 1}`}
                            >
                              {task.description}
                              <Avatars users={task.accountables} />
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
      <Modal open={openModal}>
        <form className="modal__content__container" onSubmit={add}>
          <h3>Ajouter une action</h3>
          <p>Entrez la description de l'action à ajouter</p>
          <textarea
            onClick={(e) => e.stopPropagation()}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form__textarea"
            placeholder={"Description de l'action..."}
          />
          <Select
            defaultLabel={actions[0].title}
            style={{ margin: "4px" }}
            label={actionSelected?.title}
            width={200}
            height={10}
            isActive={isActiveAction}
            setIsActive={setIsActiveAction}
          >
            {actions.map((item) => (
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
          <p>Indiquez la personne à laquelle vous voulez attribuer l'action</p>
          <AutoCompleteUsers
            setSelectedAccountables={setSelectedAccountables}
          />
          <div style={{ display: "flex", gap: "12px" }}>
            <Button
              type="submit"
              disabled={!actionSelected || input === "" ? true : false}
              reversed
              onClick={(e) => {
                e.stopPropagation();
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
        </form>
      </Modal>
    </>
  );
};

export default ActionsDnd;
