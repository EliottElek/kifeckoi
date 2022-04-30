import "./kanban.scss";
import { DragDropContext } from "react-beautiful-dnd";
import React, { useState } from "react";
import Card from "./Card/Card";
import { Context } from "../Context/Context";
import Button from "../../materials/Button/Button";
import { BiPlus } from "react-icons/bi";
import { MdOutlineClear } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import {
  FIND_EVENTS_BY_PROJECT_ID,
  FIND_PROJECT_BY_PROJECT_ID,
} from "../../graphql/queries";
import { CREATE_EVENT, CHANGE_EVENT_STATE } from "../../graphql/mutations";
import { toast } from "react-toastify";
import rawEvents from "../../rawEvents";
import { Navigate, useParams } from "react-router";
import { Flip } from "react-toastify";
import Column from "./Column";
import AutoTextArea from "../../materials/AutoSizeTextArea/AutoSizeTextArea";
import Progress from "../../materials/Progress/Progress";
import isEmoji from "../../assets/functions/isEmoji";
import Backdrop from "../../materials/Backdrop/Backdrop";
import getPeriod from "../../assets/functions/getPeriod";
const EventKanban = ({ type, setLength, length }) => {
  const { events, setCurrentProject, setEvents, user, currentProject } =
    React.useContext(Context);
  const [addCard, setAddCard] = useState(false);
  const [selectedAcountables, setSelectedcontributors] = React.useState([]);
  const [eventSelected, setEventSelected] = useState();
  const [eventsData, setEventsData] = React.useState([]);
  const [input, setInput] = useState("");
  const [createEvent] = useMutation(CREATE_EVENT);
  const [changeEventDescription] = useMutation(CHANGE_EVENT_STATE);

  const { id } = useParams();
  const dataProject = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id, userId: user.id },
  });
  const dataEvents = useQuery(FIND_EVENTS_BY_PROJECT_ID, {
    variables: { id: id, type: type },
  });
  React.useEffect(() => {
    if (dataProject?.data) {
      setCurrentProject({ ...dataProject?.data?.findProjectByProjectId });
    }
  }, [setCurrentProject, dataProject?.data]);

  React.useEffect(() => {
    if (dataEvents?.data) {
      setEventsData([...dataEvents?.data?.findEventsByProjectId]);
    }
  }, [dataEvents?.data, setEventsData]);

  React.useEffect(() => {
    if (!eventsData.contributors) {
      dataEvents.refetch();
    }
  }, [dataEvents, eventsData.contributors]);

  React.useEffect(() => {
    rawEvents.forEach((item) => (item.tasks = []));
    const eventsFinal = [...rawEvents];
    const eventsDataF = [...eventsData];
    eventsDataF?.forEach((event) => {
      const index = eventsFinal.findIndex((ev) => ev.title === event.status);
      if (index !== -1) eventsFinal[index].tasks.push(event);
    });
    setEvents(eventsFinal);
  }, [eventsData, setEvents]);
  const onDragEnd = async (result) => {
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
      events[sourceColIndex].tasks = sourceTask;
      events[destinationColIndex].tasks = destinationTask;
      try {
        await changeEventDescription({
          variables: {
            eventId: result?.draggableId,
            newStatus: destinationCol?.title,
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
      dataEvents.refetch();
    }
  };
  const add = async (e) => {
    if (input === "") return;
    e.preventDefault();
    const ArrayOfIds = selectedAcountables.map((acc) => acc.id);
    console.log(ArrayOfIds);
    const description =
      input.length === 3 && isEmoji(input) ? `# ${input}` : input;
    try {
      await createEvent({
        variables: {
          type: type,
          projectId: id,
          creatorId: user.id,
          description: description,
          contributors: ArrayOfIds,
          status: eventSelected.title,
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
  if (!dataProject.data && !dataProject.loading) {
    return <Navigate to={"/404"} />;
  }
  if (!currentProject)
    return (
      <Backdrop>
        <Progress size="medium" reversed />
      </Backdrop>
    );
  return (
    <>
      {!events ? (
        <Progress />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban">
            {events?.map((section, i) => (
              <Column
                addCard={addCard}
                setAddCard={setAddCard}
                section={section}
                setEventSelected={setEventSelected}
                key={section.id}
                droppableId={section.id}
              >
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <h2 className={`kanban__section__title`}>
                      {section?.title} ({section?.tasks?.length})
                    </h2>
                    <div className="kanban__section__content">
                      {section?.tasks?.map((task, index) => (
                        <Card
                          key={task.id}
                          draggableId={task.id}
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
                                  !eventSelected || input === "" ? true : false
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
                    <button
                      onClick={() => {
                        setEventSelected(section);
                        setAddCard(true);
                      }}
                      className={`kanban__section__title__button`}
                    >
                      <BiPlus /> Ajouter une carte
                    </button>
                  </div>
                )}
              </Column>
            ))}
          </div>
        </DragDropContext>
      )}
    </>
  );
};

export default EventKanban;
