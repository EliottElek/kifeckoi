import "./kanban.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";
import Card from "./Card/Card";
import { Context } from "../Context/Context";
import Button from "../../materials/Button/Button";
import { BiPlus } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { useMutation, useQuery } from "@apollo/client";
import {
  FIND_ACTIONS_BY_PROJECT_ID,
  FIND_PROJECT_BY_PROJECT_ID,
} from "../../graphql/queries";
import { CREATE_ACTION, CHANGE_ACTION_STATE } from "../../graphql/mutations";
import rawActions from "../../rawActions";
import { useParams } from "react-router";
import AutoCompleteUsers from "./AutoCompleteUsers";

const ActionsDnd = ({ setLength, length }) => {
  const {
    actions,
    currentProject,
    setCurrentProject,
    setActions,
    setOpenAlert,
    setAlertContent,
  } = React.useContext(Context);
  const [addCard, setAddCard] = useState(false);
  const [selectedAcountables, setSelectedAccountables] = React.useState([]);
  const [actionSelected, setActionSelected] = useState();
  const [actionData, setActionData] = React.useState([]);
  const [input, setInput] = useState("");
  const [createAction] = useMutation(CREATE_ACTION);
  const [changeActionState] = useMutation(CHANGE_ACTION_STATE);

  const { id } = useParams();
  const dataProject = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id },
  });
  React.useEffect(() => {
    if (dataProject?.data) {
      setCurrentProject({ ...dataProject?.data?.findProjectByProjectId });
    }
  }, [setCurrentProject, dataProject?.data]);
  const dataActions = useQuery(FIND_ACTIONS_BY_PROJECT_ID, {
    variables: { id: id },
  });
  React.useEffect(() => {
    if (dataActions?.data && actionData.length === 0) {
      setActionData([...dataActions?.data?.findActionsByProjectId]);
    }
  }, [setActionData, dataActions?.data, actionData.length]);

  React.useEffect(() => {
    rawActions.forEach((item) => (item.tasks = []));
    const actionsFinal = [...rawActions];
    const actionsDataF = [...actionData];
    actionsDataF?.forEach((action) => {
      const index = actionsFinal.findIndex((ac) => ac.title === action.status);
      if (index !== -1) actionsFinal[index].tasks.push(action);
    });
    setActions(actionsFinal);
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
  const add = async (e) => {
    e.preventDefault();
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
      setLength && setLength(length + 1);
      setSelectedAccountables([]);
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
                  </h2>
                  <button className="kanban__section__title__more__button">
                    <FiMoreHorizontal />
                  </button>
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
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {addCard && actionSelected.id === section.id && (
                      <Card add type={"action"} task={""} className={`card`}>
                        <form className="add__card__form" onSubmit={add}>
                          <textarea
                            onChange={(e) => setInput(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            value={input}
                            autoFocus
                            className="modif__description__textarea"
                          ></textarea>
                          <AutoCompleteUsers
                            placeholder="Responsable..."
                            setSelectedAccountables={setSelectedAccountables}
                          />
                          <div className="add__card__button__container">
                            <Button
                              style={{ width: "100%" }}
                              type="submit"
                              disabled={
                                !actionSelected || input === "" ? true : false
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                add(e);
                                setAddCard(false);
                              }}
                            >
                              Ajouter
                            </Button>
                            <Button
                            reversed
                              style={{ width: "100%" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setAddCard(false);
                              }}
                            >
                              Annuler
                            </Button>
                          </div>
                        </form>
                      </Card>
                    )}
                    {provided.placeholder}
                  </div>
                  <button
                    onClick={() => {
                      setActionSelected(section);
                      setAddCard(true);
                    }}
                    className={`kanban__section__title__button`}
                  >
                    <BiPlus /> Ajouter une carte
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default ActionsDnd;
