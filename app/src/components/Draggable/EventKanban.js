import "./kanban.scss";
import "./Card/card.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";
import Card from "./Card/Card";
import { Context } from "../Context/Context";
import Button from "../../materials/Button/Button";
import { MdOutlineClear } from "react-icons/md";
import { useQuery } from "@apollo/client";
import { FIND_PROJECT_BY_PROJECT_ID } from "../../graphql/queries";
import {
  useCreateEvent,
  useChangeEventStatus,
} from "../../hooks/mutations/event";
import { useGetEventsByStatus } from "../../hooks/queries/event";
import { useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router";
import { Flip } from "react-toastify";
import Column from "./Column";
import AutoTextArea from "../../materials/AutoSizeTextArea/AutoSizeTextArea";
import Progress from "../../materials/Progress/Progress";
import Backdrop from "../../materials/Backdrop/Backdrop";
import getPeriod from "../../assets/functions/getPeriod";
import AddColumn from "./AddColumn";
import { ListEvents } from "../ListEvents/ListEvents";
const EventKanban = ({ type, setLength, length }) => {
  const {
    events,
    setCurrentProject,
    setEvents,
    user,
    currentProject,
    addCard,
    setAddCard,
    setDataEvents,
    dataEvents,
  } = React.useContext(Context);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const display = searchParams.get("display");
  const [selectedAcountables, setSelectedcontributors] = useState([]);
  const [eventSelected, setEventSelected] = useState();
  const [input, setInput] = useState("");
  const createEvent = useCreateEvent();
  const changeEventStatus = useChangeEventStatus();
  const { id } = useParams();
  const dataProject = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id, userId: user?.id },
    onCompleted: (data) => {
      setCurrentProject(data?.findProjectByProjectId);
    },
  });
  const dataEventsQuery = useGetEventsByStatus({
    variables: { projectId: id, type: type },
    onCompleted: (data) => {
      console.log(data.getEventsByStatus);
      const clonedArray = data.getEventsByStatus?.map((a) => {
        return { ...a };
      });
      setEvents(clonedArray ? clonedArray : []);
    },
  });
  React.useEffect(() => {
    if (dataEvents) {
      dataEvents.refetch();
    }
  }, [location, dataEvents]);
  React.useEffect(() => {
    if (dataEventsQuery) setDataEvents(dataEventsQuery);
  }, [dataEventsQuery, setDataEvents]);

  const onDragEnd = async (result) => {
    if (result.type === "column") {
      let newEvents = [...events];
      const col = newEvents.splice(result.source.index, 1);
      newEvents.splice(result.destination.index, 0, col[0]);
      console.log(newEvents);
      setEvents(newEvents);
      return;
    } else
      try {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
          const sourceColIndex = events.findIndex(
            (e) => e.id === source.droppableId
          );
          const destinationColIndex = events.findIndex(
            (e) => e.id === destination.droppableId
          );

          const sourceCol = events[sourceColIndex];
          const destinationCol = events[destinationColIndex];

          const sourceTask = [...sourceCol.tasks];
          const destinationTask = [...destinationCol.tasks];

          const [removed] = sourceTask.splice(source.index, 1);
          const removedCopy = { ...removed };
          removedCopy.status = destinationCol?.title;
          destinationTask.splice(destination.index, 0, removedCopy);
          events[sourceColIndex].tasks = [...sourceTask];
          events[destinationColIndex].tasks = [...destinationTask];
          setEvents(events);
          try {
            await changeEventStatus({
              variables: {
                eventId: result?.draggableId,
                newStatus: destinationCol?.title,
                index: destination.index,
              },
            });
          } catch (err) {
            console.log(err);
          }
          dataEvents.refetch();
        } else {
          const index = events.findIndex((e) => e.id === source.droppableId);
          const items = Array.from(events[index].tasks);
          const [reorderedItem] = items.splice(source.index, 1);
          items.splice(result.destination.index, 0, reorderedItem);
          events[index].tasks = [...items];
          setEvents(events);
        }
      } catch (err) {
        console.log(err);
        toast.error("Impossible de déplacer l'évènement.", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
  };
  const add = async (e) => {
    if (input === "") return;
    e.preventDefault();
    const ArrayOfIds = selectedAcountables.map((acc) => acc.id);
    try {
      const index = eventSelected.tasks.length;
      await createEvent({
        variables: {
          type: type,
          index: index,
          projectId: id,
          creatorId: user.id,
          description: input,
          contributors: ArrayOfIds,
          status: eventSelected ? eventSelected.title : "Nouveau",
          period: getPeriod(),
        },
      });
      setInput("");
      dataEvents.refetch();
      setLength && setLength(length + 1);
      setSelectedcontributors([]);
    } catch (err) {
      toast.warning(`Impossible de créer l'évènement.`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        transition: Flip,
      });
      console.log(err);
    }
  };
  const commentEnterSubmit = (e) => {
    if (e.key === "Enter" && e.shiftKey === false && input !== "") {
      return add(e);
    }
  };
  const setAddColumn = (value) => {
    const newEvents = [...events];
    newEvents.push({ id: newEvents.length, title: value, tasks: [] });
    setEvents(newEvents);
  };
  if (!dataProject && !dataProject.loading) {
    return <Navigate to={"/404"} />;
  }
  if (!currentProject)
    return (
      <Backdrop>
        <Progress size="medium" reversed />
      </Backdrop>
    );
  if (!dataEvents?.data || dataEvents.loading || !events)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Progress size="medium" reversed />
      </div>
    );
  if (display === "list") {
    return <ListEvents type={type} setLength={setLength} length={length} />;
  }
  if (!events)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Progress size="medium" reversed />
      </div>
    );

  return (
    <div className="kanban">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-bookshelves"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              style={{ display: "flex" }}
              ref={provided.innerRef}
            >
              {events?.map((section, i) => (
                <Column
                  addCard={addCard}
                  setAddCard={setAddCard}
                  section={section}
                  setEventSelected={setEventSelected}
                  key={section.id}
                  droppableId={section.id}
                  index={i}
                >
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <h2 className={`kanban__section__title`}>
                        {section?.title} ({section?.tasks?.length})
                      </h2>
                      <div className="kanban__section__content">
                        {section?.tasks?.map((task, index) => (
                          <Card
                            key={task?.id}
                            draggableId={task?.id}
                            index={index}
                            type={type}
                            task={task}
                            setLength={setLength}
                            length={length}
                            dataEvents={dataEvents}
                            dataProject={dataProject}
                            className={`card card__${i + 1}`}
                          />
                        ))}
                        {addCard && eventSelected.id === section.id && (
                          <Card add type={type} task={""} className={`card`}>
                            <form className="add__card__form" onSubmit={add}>
                              <AutoTextArea
                                onBlur={() => setAddCard(false)}
                                onKeyPress={commentEnterSubmit}
                                placeholder={"Titre de l'évènement..."}
                                onChange={(e) => setInput(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                value={input}
                                autoFocus
                                className="modif__description__textarea"
                              ></AutoTextArea>
                              <div className="add__card__button__container">
                                <Button
                                  style={{ width: "80%", height: "35px" }}
                                  type="submit"
                                  disabled={
                                    !eventSelected || input === ""
                                      ? true
                                      : false
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    add(e);
                                    setAddCard(false);
                                  }}
                                >
                                  Ajouter
                                </Button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setAddCard(false);
                                  }}
                                  className="clear__button"
                                >
                                  <MdOutlineClear />
                                </button>
                              </div>
                            </form>
                          </Card>
                        )}
                        {provided.placeholder}
                      </div>
                      <div className={`kanban__section__spacer`}></div>
                    </div>
                  )}
                </Column>
              ))}
              {provided.placeholder}
              <AddColumn setAddColumn={setAddColumn} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default EventKanban;
