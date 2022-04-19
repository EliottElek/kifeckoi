import { useContext, useState, useEffect } from "react";
import "./card.scss";
import "../../Client/RecentEvents/RecentEvents.css";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineClear } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { FiMoreVertical, FiMoreHorizontal } from "react-icons/fi";
import { FaRegComments } from "react-icons/fa";
import { HiOutlineDuplicate } from "react-icons/hi";
import Modal from "../../../materials/Modal/Modal";
import Chip from "../../../materials/Chip/Chip";
import { Flip } from "react-toastify";
import ReactTooltip from "react-tooltip";
import Avatars from "./Avatars";
import {
  CHANGE_EVENT_DESCRIPTION,
  CHANGE_EVENT_STATE,
  DELETE_EVENT,
  CREATE_EVENT,
} from "../../../graphql/mutations";
import { GET_ALL_COMMENTS_BY_EVENT_ID } from "../../../graphql/queries";
import { Context } from "../../Context/Context";
import { useMutation, useQuery } from "@apollo/client";
import Popup from "../../../materials/Popup/Popup";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import MenuItem from "../../../materials/Menu/MenuItem";
import Menu from "../../../materials/Menu/Menu";
import AutoTextArea from "../../../materials/AutoSizeTextArea/AutoSizeTextArea";
import ReactMarkdown from "../../../assets/ReactMarkdown";
import Progress from "../../../materials/Progress/Progress";
import Comments from "./Comments/Comments";
import ReactMarkdownSnippet from "../../../assets/ReactMarkdown";
import Button from "../../../materials/Button/Button";
const Card = (props) => {
  const {
    setEvents,
    events,
    currentProject,
    setCurrentProject,
    markdown,
    user,
  } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(false);
  const [modifMode, setModifMode] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [comments, setComments] = useState([]);
  const [openEditPopUp, setOpenEditPopUp] = useState(false);
  const [submitOnEnterMode, setSubmitOnEnterMode] = useState(false);
  const [changeEventDescription] = useMutation(CHANGE_EVENT_DESCRIPTION);
  const [changeEventState] = useMutation(CHANGE_EVENT_STATE);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [createEvent] = useMutation(CREATE_EVENT);
  const [description, setDescription] = useState(props.task.description);

  const { id } = useParams();
  const commentsData = useQuery(GET_ALL_COMMENTS_BY_EVENT_ID, {
    variables: { eventId: props.task.id },
  });
  useEffect(() => {
    if (commentsData?.data) {
      setComments(commentsData?.data?.getAllCommentsByEventId);
    }
  }, [setComments, commentsData?.data]);
  const handleModifyDescription = async (e) => {
    e.stopPropagation();
    try {
      await changeEventDescription({
        variables: {
          eventId: props.task.id,
          newDescription: description,
        },
      });
      const index = events.findIndex((e) => e.title === props.task.status);
      const items = [...events[index].tasks];
      const itemsD = JSON.parse(JSON.stringify(items));

      const item = itemsD.find((item) => item.id === props.task.id);
      item.description = description;
      events[index].tasks = itemsD;
      setEvents([...events]);
      currentProject.events = [...events];
      setCurrentProject(currentProject);
      setModifMode(false);
    } catch (err) {
      toast.error("Impossible de modifier la description.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      console.log(err);
    }
  };
  const handleCloseModal = () => {
    setModifMode(false);
    setOpenModal(false);
  };
  useEffect(() => {
    if (props.task.status === "Réalisé") setStatus("event__green");
    else if (props.task.status === "En cours") setStatus("event__marron");
    else if (props.task.status === "Nouveau") setStatus("event__blue");
    else if (props.task.status === "À planifier") setStatus("event__orange");
  }, [props.task.status, setStatus]);
  const handleMoveTo = async (category) => {
    try {
      const sourceColIndex = events.findIndex(
        (e) => e.title === props.task.status
      );
      const destinationColIndex = events.findIndex((e) => e.id === category.id);
      const sourceCol = events[sourceColIndex];
      const destinationCol = events[destinationColIndex];
      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];
      const index = sourceTask.findIndex((task) => task.id === props.task.id);
      const [removed] = sourceTask.splice(index, 1);
      const removedCopy = { ...removed };
      removedCopy.status = destinationCol?.title;
      events[sourceColIndex].tasks = sourceTask;
      events[destinationColIndex].tasks = destinationTask;
      destinationTask.splice(0, 0, removedCopy);

      events[sourceColIndex].tasks = sourceTask;
      events[destinationColIndex].tasks = destinationTask;
      await changeEventState({
        variables: {
          eventId: props.task.id,
          newStatus: category?.title,
        },
      });
      toast(
        <Msg>
          {props.task.name} déplacée dans {category?.title}
        </Msg>,
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
      setOpenPopUp(false);
    } catch (err) {
      toast.error("Impossible de déplacer l'évènement.", {
        position: toast.POSITION.BOTTOM_LEFT,
        transition: Flip,
      });
      console.log(err);
    }
    setEvents([...events]);
    currentProject.events = [...events];
    setCurrentProject(currentProject);
  };

  const handledeleteEvent = async (e) => {
    e.stopPropagation();
    try {
      await deleteEvent({
        variables: {
          eventId: props.task.id,
        },
      });
      const index = events.findIndex((e) => e.title === props.task.status);
      const items = [...events[index].tasks];
      const itemsD = JSON.parse(JSON.stringify(items));
      const newArray = itemsD.filter((item) => item.id !== props.task.id);
      events[index].tasks = [...newArray];
      setEvents([...events]);
      currentProject.events = [...events];
      setCurrentProject(currentProject);
      setModifMode(false);
      toast(`${props.type} archivé(e) avec succès.`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      toast.error("Impossible de supprimer cette carte. Réessayez plus tard.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        transition: Flip,
      });
    }
  };
  const duplicate = async (e) => {
    e.stopPropagation();
    try {
      const ArrayOfIds = props.task.contributors.map((acc) => acc.id);

      const newEvent = await createEvent({
        variables: {
          type: props.type,
          projectId: id,
          description: props.task.description,
          contributors: ArrayOfIds,
          creatorId: user.id,
          status: props.task.status,
        },
      });
      const index = events.findIndex(
        (event) => event.title === props.task.status
      );
      events[index].tasks.splice(events[index] + 1, 0, {
        ...newEvent?.data?.createEvent,
        new: true,
      });
      setEvents([...events]);
      currentProject.events = [...events];
      setCurrentProject(currentProject);

      props.setLength && props.setLength(props.length + 1);
      toast(
        `${
          newEvent?.data?.createEvent
            ? newEvent?.data?.createEvent.type
            : "Évenement"
        } dupliqué(e) avec succès.`,
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
    } catch (err) {
      toast.error(`Impossible de créer l'évènement.`, {
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

  const handleMoreAction = (e) => {
    e.stopPropagation();
    setOpenPopUp(true);
  };
  const commentEnterSubmit = (e) => {
    if (submitOnEnterMode && e.key === "Enter" && e.shiftKey === false) {
      return handleModifyDescription(e);
    }
  };
  if (props.add) return <div className="card">{props.children}</div>;
  const Msg = ({ children }) => <div>{children}</div>;
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (!openPopUp) {
            setOpenModal(true);
          } else setOpenPopUp(false);
        }}
        className={"card"}
      >
        <div
          className={
            props.dragging ? "card__content dragging" : "card__content"
          }
        >
          <div className="card__content__events__container">
            <button
              data-tip
              data-for="archiveTooltip"
              onClick={handledeleteEvent}
              className="kanban__section__content__name__container__edit__button"
            >
              <MdOutlineDeleteOutline />
            </button>
            <button
              data-tip
              data-for="duplicateTooltip"
              onClick={duplicate}
              className="kanban__section__content__name__container__edit__button more__button"
            >
              <HiOutlineDuplicate />
            </button>
            <button
              data-tip
              data-for="moreTooltip"
              onClick={handleMoreAction}
              className="kanban__section__content__name__container__edit__button more__button"
            >
              <FiMoreVertical />
            </button>
            <span className="kanban__section__content__name__container__comments__indicator">
              <span className="kanban__section__content__name__container__comments__indicator__number">
                {comments?.length}
              </span>
              <FaRegComments />
            </span>
          </div>
          <div className={"card__content__added__indicator"}>
            {modifMode ? (
              <div className="kanban__section__content__name__container__button__container">
                <button
                  data-tip
                  data-for="moreTooltip"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenEditPopUp(true);
                  }}
                  className="kanban__section__content__name__container__edit__button more__button"
                >
                  <FiMoreHorizontal />
                </button>
                <Popup open={openEditPopUp} setOpen={setOpenEditPopUp} bottom>
                  <Menu>
                    <MenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        setSubmitOnEnterMode(!submitOnEnterMode);
                        setOpenEditPopUp(false);
                      }}
                    >
                      <p>
                        {submitOnEnterMode
                          ? "Désactiver la soumission rapide..."
                          : "Activer la soumission rapide..."}
                      </p>
                    </MenuItem>
                  </Menu>
                </Popup>
                <button
                  data-tip
                  data-for="validateTooltip"
                  onClick={handleModifyDescription}
                  className="kanban__section__content__name__container__edit__button validate"
                >
                  <AiOutlineCheck />
                </button>
                <button
                  data-tip
                  data-for="cancelTooltip"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModifMode(false);
                  }}
                  className="kanban__section__content__name__container__edit__button"
                >
                  <MdOutlineClear />
                </button>
              </div>
            ) : (
              <button
                data-tip
                data-for="editTooltip"
                onClick={(e) => {
                  e.stopPropagation();
                  setModifMode(true);
                }}
                className="kanban__section__content__name__container__edit__button"
              >
                <FiEdit2 />
              </button>
            )}
          </div>
          {props.type === "Info" && (
            <span className="card__icon">
              <i className="gg-info"></i>
              Info
            </span>
          )}
          {props.type === "Action" && (
            <span className="card__icon violet">
              <i className="gg-arrows-exchange-alt"></i> Action
            </span>
          )}
          {props.type === "Decision" && (
            <span className="card__icon marron">
              <i className="gg-alarm"></i> Décision
            </span>
          )}
          {props.type === "Risk" && (
            <span className="card__icon orange">
              <i className="gg-bell"></i> Risque
            </span>
          )}
          {props.type === "Problem" && (
            <span className="card__icon red">
              <i className="gg-danger"></i> Problème
            </span>
          )}
          {modifMode ? (
            <form
              className="modif__description__form"
              onSubmit={handleModifyDescription}
            >
              <AutoTextArea
                autoFocus
                onKeyPress={commentEnterSubmit}
                onChange={(e) => setDescription(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                value={description}
                className="modif__description__textarea"
              ></AutoTextArea>
            </form>
          ) : (
            <div className="card__description">
              {markdown ? (
                <ReactMarkdown>{props.task.description}</ReactMarkdown>
              ) : (
                <p>{props.task.description}</p>
              )}
            </div>
          )}
          <Avatars users={props.task.contributors} />
        </div>
      </div>
      <Modal open={openModal} setOpen={handleCloseModal}>
        <div className="modal__content__container">
          <button
            data-tip
            data-for="closeTooltip"
            onClick={(e) => {
              e.stopPropagation();
              handleCloseModal();
              setModifMode(false);
            }}
            className="close__modal__button"
          >
            <MdOutlineClear />
          </button>
          {modifMode ? (
            <div>
              <AutoTextArea
                autoFocus
                onKeyPress={commentEnterSubmit}
                oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                onChange={(e) => setDescription(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "100%",
                  fontSize: "2rem!important",
                }}
                value={description}
                className="modif__description__textarea open__card__textarea"
              ></AutoTextArea>
              <div className={"action__container__modif__mode"}>
                <Button
                  reversed
                  data-tip
                  data-for="cancelTooltip"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModifMode(false);
                  }}
                >
                  Annuler
                </Button>
                <Button
                  data-for="validateTooltip"
                  onClick={handleModifyDescription}
                >
                  Valider
                </Button>
              </div>
            </div>
          ) : (
            <span
              className={"modal__card__content"}
              onClick={(e) => {
                e.stopPropagation();
                setModifMode(true);
              }}
            >
              <ReactMarkdownSnippet>
                {props.task.description}
              </ReactMarkdownSnippet>
            </span>
          )}
          <div>
            <span className={"status__container"}>
              Status : <span className={status}>{props.task.status}</span>
            </span>
          </div>
          {props.task.contributors.length !== 0 && (
            <div className="kanban__section__content__name__container__avatars__container">
              <span>Contributeurs : </span>
              <div className="kanban__section__content__name__container__avatars__container">
                {props.task.contributors.map((acc) => (
                  <Chip key={acc.id} text={acc.username} src={acc.avatarUrl} />
                ))}
              </div>
            </div>
          )}
          <span>
            Créé le :{" "}
            <span>
              {new Date(props.task.creation).getDate()}
              {"/"}
              {new Date(props.task.creation).getMonth()}
              {"/"}
              {new Date(props.task.creation).getFullYear()}
              {" à "}
              {new Date(props.task.creation).getHours()}
              {":"}
              {new Date(props.task.creation).getMinutes()}
            </span>
            {props.task.creator && (
              <span>
                {" "}
                par {props.task.creator.firstname} {props.task.creator.lastname}
              </span>
            )}
          </span>
          {!comments ? (
            <Progress />
          ) : (
            <Comments
              comments={comments}
              event={props.task}
              setComments={setComments}
            />
          )}{" "}
        </div>
      </Modal>
      <Popup open={openPopUp} setOpen={setOpenPopUp} bottom>
        <Menu>
          <MenuItem
            onClick={(e) => {
              setOpenModal(true);
              setOpenPopUp(false);
            }}
          >
            <p>Ouvrir la carte...</p>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              duplicate(e);
              setOpenPopUp(false);
            }}
          >
            <p>Dupliquer...</p>
          </MenuItem>
          <span className={"divider"} />
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setModifMode(true);
              setOpenPopUp(false);
            }}
          >
            <p>Édition rapide...</p>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setOpenPopUp(false);
              setOpenModal(true);
              setModifMode(true);
            }}
          >
            <p>Édition avancée...</p>
          </MenuItem>
          <span className={"divider"} />
          {events.map((category) => {
            if (category.title !== props.task.status)
              return (
                <MenuItem
                  key={category.title}
                  onClick={() => handleMoveTo(category)}
                >
                  <p>
                    Déplacer vers{" "}
                    <span className={"underlined"}>{category.title}</span>...
                  </p>
                </MenuItem>
              );
            else return null;
          })}
          <span className={"divider"} />
          <MenuItem
            onClick={(e) => {
              handledeleteEvent(e);
              setOpenPopUp(false);
            }}
          >
            <p>Archiver...</p>
          </MenuItem>
        </Menu>
      </Popup>
      {!props.dragging && (
        <>
          <ReactTooltip delayShow={500} id="duplicateTooltip" effect="solid">
            <span>Dupliquer</span>
          </ReactTooltip>
          <ReactTooltip delayShow={500} id="archiveTooltip" effect="solid">
            <span>Archiver</span>
          </ReactTooltip>
          <ReactTooltip delayShow={500} id="moreTooltip" effect="solid">
            <span>Plus d'actions</span>
          </ReactTooltip>
          <ReactTooltip delayShow={500} id="editTooltip" effect="solid">
            <span>Éditer</span>
          </ReactTooltip>
          <ReactTooltip delayShow={500} id="validateTooltip" effect="solid">
            <span>Valider</span>
          </ReactTooltip>
          <ReactTooltip delayShow={500} id="cancelTooltip" effect="solid">
            <span>Annuler</span>
          </ReactTooltip>
        </>
      )}
    </>
  );
};

export default Card;
