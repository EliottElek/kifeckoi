import "./kanban.scss";
import "./Card/card.scss";
import { DragDropContext } from "react-beautiful-dnd";
import React, { useState } from "react";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import Card from "./Card/Card";
import { Context } from "../Context/Context";
import Button from "../../materials/Button/Button";
import { MdOutlineClear } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { FaChevronDown } from "react-icons/fa";
import Modal from "../../materials/Modal/Modal";
import {
  FIND_EVENTS_BY_PROJECT_ID,
  FIND_PROJECT_BY_PROJECT_ID,
} from "../../graphql/queries";
import {
  CREATE_EVENT,
  CHANGE_EVENT_STATUS,
  CHANGE_EVENT_STATE,
  DELETE_MULTIPLE_EVENTS,
  CAPTURE_EVENTS_POSITIONS,
} from "../../graphql/mutations";
import { toast } from "react-toastify";
import rawEvents from "../../rawEvents";
import { Navigate, useParams } from "react-router";
import { Flip } from "react-toastify";
import Column from "./Column";
import AutoTextArea from "../../materials/AutoSizeTextArea/AutoSizeTextArea";
import Progress from "../../materials/Progress/Progress";
import Backdrop from "../../materials/Backdrop/Backdrop";
import getPeriod from "../../assets/functions/getPeriod";
import Row from "./Row/Row";
import CheckBox from "../../materials/CheckBox/CheckBox";
const EventKanban = ({ type, setLength, length }) => {
  const {
    events,
    setCurrentProject,
    setEvents,
    user,
    currentProject,
    listStyle,
    addCard,
    setAddCard,
    setSelectedEvents,
    selectedEvents,
    eventsData,
    setEventsData,
    setDataEvents,
    dataEvents,
  } = React.useContext(Context);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedAcountables, setSelectedcontributors] = useState([]);
  const [eventSelected, setEventSelected] = useState();
  const [input, setInput] = useState("");
  const [createEvent] = useMutation(CREATE_EVENT);
  const [changeEventStatus] = useMutation(CHANGE_EVENT_STATUS);
  const [changeEventState] = useMutation(CHANGE_EVENT_STATE);
  const [deleteMultipleEvents] = useMutation(DELETE_MULTIPLE_EVENTS);
  const [captureEventsPositions] = useMutation(CAPTURE_EVENTS_POSITIONS);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopUp = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dataProject = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id, userId: user?.id },
    onCompleted: (data) => {
      setCurrentProject(data?.findProjectByProjectId);
    },
  });
  const dataEventsQuery = useQuery(FIND_EVENTS_BY_PROJECT_ID, {
    variables: { id: id, type: type },
    onCompleted: (data) => {
      setEventsData([...data.findEventsByProjectId]);
    },
  });
  React.useEffect(() => {
    if (dataEventsQuery) setDataEvents(dataEventsQuery);
  }, [dataEventsQuery, setDataEvents]);
  React.useEffect(() => {
    rawEvents.forEach((item) => (item.tasks = []));
    const eventsFinal = [...rawEvents];
    const eventsDataF = [...eventsData];
    eventsDataF?.forEach((event) => {
      const index = eventsFinal.findIndex((ev) => ev.title === event.status);
      if (index !== -1) eventsFinal[index].tasks[event.index] = event;
    });
    setEvents(eventsFinal);
  }, [eventsData, setEvents]);

  const changeStateSelectedEvents = async (newState) => {
    try {
      selectedEvents.forEach(
        async (event) =>
          await changeEventState({
            variables: {
              eventId: event.id,
              newState: newState,
            },
          })
      );
      toast.success(
        `${selectedEvents.length} évènements passés en "${newState}".`,
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          transition: Flip,
        }
      );
      setSelectedEvents([]);
    } catch (err) {
      toast.warning(`Une erreur est surevenue.`, {
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
    dataEvents.refetch();
  };
  const selectAllEvents = () => {
    if (!selectAll) {
      setSelectedEvents([]);
      setSelectedEvents(
        eventsData.map((e) => {
          return { id: e.id };
        })
      );
      setSelectAll(false);
    } else {
      setSelectedEvents([]);
    }
    console.log(selectedEvents);
  };

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
        try {
          await captureEventsPositions({
            variables: {
              events: events[sourceColIndex].tasks.map((e) => e.id),
              indexes: events[sourceColIndex].tasks.map((e, i) => i),
            },
          });
          await captureEventsPositions({
            variables: {
              events: events[destinationColIndex].tasks.map((e) => e.id),
              indexes: events[destinationColIndex].tasks.map((e, i) => i),
            },
          });
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const index = events.findIndex((e) => e.id === source.droppableId);
      const items = Array.from(events[index].tasks);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      events[index].tasks = [...items];
      setEvents(events);
      try {
        await captureEventsPositions({
          variables: {
            events: items.map((e) => e.id),
            indexes: items.map((e, i) => i),
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
    setTimeout(() => dataEvents.refetch(), 500);
  };
  const handleDeleteSelectedEvents = async (e) => {
    try {
      const ids = selectedEvents.map((e) => e.id);
      const response = await deleteMultipleEvents({
        variables: {
          eventIds: ids,
        },
      });
      setSelectedEvents([]);
      toast(`${response.data.deleteMultipleEvents.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (err) {
      toast.error(
        "Impossible de supprimer ces évènements. Réessayez plus tard.",
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        }
      );
    }
    dataEvents.refetch();
    setOpenDeleteModal(false);
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
  if (listStyle) {
    return (
      <div className={"events__rows"}>
        <table className={"events__rows__container"}>
          <tr className={"events__rows__container__head"}>
            <th
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                height: "100%",
              }}
            >
              <CheckBox
                onClick={selectAllEvents}
                checked={selectAll}
                setChecked={setSelectAll}
              />
              <span
                style={{
                  fontWeight: "normal",
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  selectedEvents.length > 0 && handleClick(e);
                }}
              >
                <FaChevronDown fontSize="0.6rem" />
              </span>
            </th>
            <th>Période</th>
            <th>Contributeurs</th>
            <th>Description</th>
            <th>Status</th>
            <th>État</th>
            <th></th>
          </tr>
          {eventsData.map((e, i) => (
            <Row
              key={i}
              type={type}
              task={e}
              setLength={setLength}
              length={length}
              dataEvents={dataEvents}
              dataProject={dataProject}
            />
          ))}
          {addCard && (
            <tr className={"event__row"}>
              <td></td>
              <td
                style={{ fontSize: "0.9rem" }}
                className={"current__period__row"}
              >
                {getPeriod()}
              </td>

              <td></td>
              <td>
                <form onSubmit={add}>
                  <AutoTextArea
                    onKeyPress={commentEnterSubmit}
                    placeholder={"Titre de l'évènement..."}
                    onChange={(e) => setInput(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    value={input}
                    autoFocus
                    className="modif__description__textarea__row"
                  ></AutoTextArea>
                </form>
              </td>
              <td style={{ fontSize: "0.9rem" }}>Nouveau</td>
              <td>
                <Button style={{ height: "30px" }} onClick={add}>
                  Créer
                </Button>
              </td>
              <td style={{ padding: "4px" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddCard(false);
                  }}
                  className="clear__button"
                >
                  <MdOutlineClear />
                </button>
              </td>
            </tr>
          )}
        </table>
        {!addCard && (
          <Button
            onClick={() => setAddCard(true)}
            style={{
              position: "sticky",
              bottom: "10px",
              margin: "10px",
              zIndex: 1,
            }}
          >
            Ajouter un évènement +
          </Button>
        )}
        <Modal open={openDeleteModal} setOpen={setOpenDeleteModal}>
          <div
            className="modal__content__container space__between"
            style={{ width: "95%" }}
          >
            <button
              data-tip
              data-for="closeTooltip"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteModal(false);
              }}
              className="close__modal__button"
            >
              <MdOutlineClear />
            </button>
            <div>
              <h3>
                Êtes-vous sûr(e) de vouloir supprimer {selectedEvents.length}{" "}
                évènement(s) ?
              </h3>
              {selectedEvents.length === 1 ? (
                <p>L'évènement suivant sera supprimé :</p>
              ) : (
                <p>
                  Les {selectedEvents.length} évènement(s) suivants seront
                  supprimés :
                </p>
              )}
              <ul
                style={{
                  margin: "20px",
                }}
              >
                {selectedEvents.map((eve) => (
                  <li
                    style={{
                      listStyle: "inside",
                    }}
                    key={eve.id}
                  >
                    id : {eve.id}
                  </li>
                ))}
              </ul>
              <p>La suppression sera définitive. </p>
            </div>
            <div
              className={"delete__actions__container"}
              style={{ position: "sticky", bottom: "12px" }}
            >
              <Button
                reversed
                onClick={() => {
                  setOpenDeleteModal(false);
                }}
              >
                Annuler
              </Button>
              <Button onClick={handleDeleteSelectedEvents}>Supprimer</Button>
            </div>
          </div>
        </Modal>
        <Menu
          anchorEl={anchorEl}
          open={openPopUp}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              color: "var(--font-color)",
              bgcolor: "var(--card-background)",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              changeStateSelectedEvents("Vérifié");
            }}
          >
            <span>Passer en "Vérifié"</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              changeStateSelectedEvents("À vérifier");
            }}
          >
            <span>Passer en "À vérifier"</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              setOpenDeleteModal(true);
            }}
          >
            <span>Supprimer {selectedEvents?.length} évènement(s)</span>
          </MenuItem>
        </Menu>
      </div>
    );
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
                <div className={`kanban__section__spacer`}></div>
              </div>
            )}
          </Column>
        ))}
      </DragDropContext>
    </div>
  );
};

export default EventKanban;
