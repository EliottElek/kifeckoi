import React, { useContext, useState } from "react";
import "./card.scss";
import "../kanban.scss";
import "../../GlobalInfos/GlobalInfos.scss";
import { FiEdit2 } from "react-icons/fi";
import { BiTime } from "react-icons/bi";
import { MdOutlineClear } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { Divider } from "@mui/material";
import { FiMoreVertical, FiMoreHorizontal } from "react-icons/fi";
import { FaRegComments } from "react-icons/fa";
import { HiOutlineDuplicate } from "react-icons/hi";
import DoneIcon from "@mui/icons-material/Done";
import Modal from "../../../materials/Modal/Modal";
import ReactTooltip from "react-tooltip";
import Avatars from "./Avatars";
import "../../TextEditor/TextEditor.scss";
import AddContributorsEvent from "./AddContributorsEvent";
import { useSearchParams } from "react-router-dom";
import {
  useChangeEventDescription,
  useChangeEventStatus,
  useChangeEventState,
  useDeleteEvent,
  useCreateEvent,
  useCreateNotification,
  useMentionUsersInEvent,
} from "../../../hooks/mutations/event";
import { Draggable } from "react-beautiful-dnd";
import { Context } from "../../Context/Context";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { MenuItem } from "@mui/material";
import { Menu } from "@mui/material";
import AutoTextArea from "../../../materials/AutoSizeTextArea/AutoSizeTextArea";
import Button from "../../../materials/Button/Button";
import getPeriod from "../../../assets/functions/getPeriod";
import RenderHtml from "../../../assets/RenderHtml";
import { NavLink } from "react-router-dom";
const Card = (props) => {
  const { events, currentProject, user, dataEvents, setEvents } =
    useContext(Context);
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddContributorModal, setOpenAddContributorModal] = useState(false);
  const [modifMode, setModifMode] = useState(false);
  const [submitOnEnterMode, setSubmitOnEnterMode] = useState(false);
  const modifyDescription = useChangeEventDescription();
  const changeEventStatus = useChangeEventStatus();
  const changeEventState = useChangeEventState();
  const deleteEvent = useDeleteEvent();
  const createEvent = useCreateEvent();
  const createNotification = useCreateNotification();
  const mentionUsersInEvent = useMentionUsersInEvent();
  const [searchParams] = useSearchParams();
  const display = searchParams.get("display");
  const [description, setDescription] = useState(props.task?.description);

  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopUp = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const openPopUp2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = (e) => {
    e.stopPropagation();
    setAnchorEl2(null);
  };
  const handleModifyDescription = async (e, content, mentions) => {
    e.stopPropagation();
    try {
      if (mentions.length !== 0) {
        //We get the ids of people mentionned
        const mentionsIds = mentions.map((m) => m.id);
        //we send an email to them, saying that the user mentionned them in an event
        await mentionUsersInEvent({
          variables: {
            eventId: props?.task?.id,
            userIds: mentionsIds,
            mentionContext: content.root.innerHTML,
          },
        });
        await createNotification({
          variables: {
            message: `${user?.firstname} vous a mentionné dans ${currentProject.name}.`,
            redirect: `/project/${
              currentProject.id
            }/${props?.task?.type.toLowerCase()}s/${props?.task?.id}`,
            projectId: currentProject.id,
            emitterId: user.id,
            content: content.getText().toString(),
            receivers: mentionsIds,
          },
        });
      }
      await modifyDescription({
        eventId: props.task.id,
        newDescription: content.root.innerHTML,
      });
      setTimeout(() => dataEvents.refetch(), 200);
      setModifMode(false);
    } catch (err) {
      toast.error("Impossible de modifier la description.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  const handleMoveTo = async (category) => {
    try {
      const sourceColIndex = events.findIndex(
        (e) => e.title === props?.task?.status
      );
      const destinationColIndex = events.findIndex((e) => e.id === category.id);
      const sourceCol = events[sourceColIndex];
      const destinationCol = events[destinationColIndex];
      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];
      const index = sourceTask.findIndex((task) => task.id === props?.task?.id);
      const [removed] = sourceTask.splice(index, 1);
      const removedCopy = { ...removed };
      removedCopy.status = destinationCol?.title;
      events[sourceColIndex].tasks = sourceTask;
      events[destinationColIndex].tasks = destinationTask;
      destinationTask.splice(0, 0, removedCopy);
      events[sourceColIndex].tasks = [...sourceTask];
      events[destinationColIndex].tasks = [...destinationTask];

      events[sourceColIndex].tasks = sourceTask;
      events[destinationColIndex].tasks = destinationTask;
      setEvents(events);
      await changeEventStatus({
        variables: {
          eventId: props?.task?.id,
          newStatus: category?.title,
          index: destinationTask.length - 1,
        },
      });
      dataEvents.refetch();
      toast(
        <Msg>
          {props?.task?.name} déplacée dans {category?.title}
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
      setAnchorEl(null);
    } catch (err) {
      toast.error("Impossible de déplacer l'évènement.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  const handleChangeState = async (newState) => {
    if (props?.task?.state === newState) return;
    try {
      await changeEventState({
        variables: {
          eventId: props?.task?.id,
          newState: newState,
        },
      });
      dataEvents.refetch();
    } catch {
      toast.error("Impossible de changer l'état de cette cart.", {
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
  const handledeleteEvent = async (e) => {
    e.stopPropagation();
    const sourceColIndex = events.findIndex(
      (e) => e.title === props?.task?.status
    );
    const sourceCol = events[sourceColIndex];
    const sourceTask = [...sourceCol.tasks];
    const index = sourceTask.findIndex((task) => task.id === props?.task?.id);
    sourceTask.splice(index, 1);
    events[sourceColIndex].tasks = sourceTask;
    events[sourceColIndex].tasks = [...sourceTask];
    try {
      await deleteEvent({
        variables: {
          eventId: props.task.id,
        },
      });
      dataEvents.refetch();
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
      toast.error("Impossible de supprimer cette carte. Réessayez plus tard.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    navigate(`/project/${currentProject.id}/${props.type.toLowerCase()}`);
  };
  const duplicate = async (e) => {
    e.stopPropagation();
    try {
      const ArrayOfIds = props?.task?.contributors?.map((acc) => acc.id);

      const newEvent = await createEvent({
        variables: {
          type: props.type,
          index: 0,
          projectId: id,
          description: props?.task?.description,
          contributors: ArrayOfIds,
          creatorId: user.id,
          period: getPeriod(),
          status: props?.task?.status,
        },
      });
      props.setLength && props.setLength(props.length + 1);
      dataEvents.refetch();
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
      });
    }
  };

  const handleMoreAction = (e) => {
    e.stopPropagation();
    handleClick(e);
  };
  const commentEnterSubmit = (e) => {
    if (submitOnEnterMode && e.key === "Enter" && e.shiftKey === false) {
      return handleModifyDescription(e);
    }
  };
  if (props.add) return <div className="card add__card">{props.children}</div>;
  const Msg = ({ children }) => <div>{children}</div>;
  return (
    <div
      style={{ textDecoration: "none" }}
      className={"card"}
      onClick={() =>
        navigate(
          `/project/${currentProject.id}/${props?.task?.type.toLowerCase()}/${
            props?.task?.id
          }?display=${display}`
        )
      }
    >
      <Draggable
        key={props?.task?.id}
        draggableId={props?.task?.id}
        index={props?.index}
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
            <div
              className={[
                snapshot.isDragging
                  ? "card__content dragging"
                  : `card__content`,
                (props?.task?.status === "Réalisé" ||
                  props?.task?.status === "Réalisé ✅") &&
                  "done__animation",
              ].join(" ")}
            >
              {props?.task?.state === "Vérifié" && (
                <div className={`status__indicator__verified`} />
              )}
              {props?.task?.state === "À vérifier" && (
                <div className={`status__indicator__to-verify`} />
              )}
              <div className="card__content__events__container">
                <button
                  data-tip
                  data-for="archiveTooltip"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDeleteModal(true);
                  }}
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
                    {props?.task?.comments?.length}
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
                        handleClick2(e);
                      }}
                      className="kanban__section__content__name__container__edit__button more__button"
                    >
                      <FiMoreHorizontal />
                    </button>
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
              <span
                data-tip
                data-for="periodTooltip"
                className={`card__icon ${
                  props?.task?.period === getPeriod()
                    ? "current__period"
                    : "previous__period"
                }`}
              >
                {props?.task?.period}
              </span>
              {props?.task?.state === "Vérifié" && !modifMode && (
                <span
                  data-tip
                  data-for="periodTooltip"
                  className={`card__status__verified`}
                >
                  {props?.task?.state}
                  <AiOutlineCheck color="var(--check-color)" />
                </span>
              )}
              {props?.task?.state === "À vérifier" && !modifMode && (
                <span
                  data-tip
                  data-for="periodTooltip"
                  className={`card__status__to__verify`}
                >
                  {props?.task?.state} <BiTime color="var(--warning-color)" />
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
                  <RenderHtml>
                    {/* {shortString(props?.task?.description, 80)} */}
                    {props?.task?.description}
                  </RenderHtml>
                </div>
              )}
              <Avatars users={props?.task?.contributors} />
              {(props?.task?.status === "Réalisé" ||
                props?.task?.status === "Réalisé ✅") && (
                <span className="card__done__span">
                  <DoneIcon style={{ height: "1rem" }} />
                </span>
              )}
            </div>
          </div>
        )}
      </Draggable>
      {true && (
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
          <ReactTooltip delayShow={500} id="periodTooltip" effect="solid">
            <span>Période</span>
          </ReactTooltip>
        </>
      )}
      <AddContributorsEvent
        event={props?.task}
        dataEvents={props.dataEvents}
        dataProject={props.dataProject}
        alreadyExistingContributors={props?.task?.contributors}
        open={openAddContributorModal}
        setOpenAddContributorModal={setOpenAddContributorModal}
      />
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
            <h3>Êtes-vous sûr de vouloir supprimer cet évènement ?</h3>
            <p>La suppression sera définitive. </p>
          </div>
          <div className={"delete__actions__container"}>
            <Button
              reversed
              onClick={() => {
                setOpenDeleteModal(false);
              }}
            >
              Annuler
            </Button>
            <Button onClick={handledeleteEvent}>Supprimer</Button>
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
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            e.stopPropagation();
            handleChangeState("Vérifié");
            setAnchorEl(null);
          }}
        >
          Vérifié
        </MenuItem>
        <MenuItem
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            e.stopPropagation();
            handleChangeState("À vérifier");
            setAnchorEl(null);
          }}
        >
          À vérifier
        </MenuItem>
        <MenuItem
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            e.stopPropagation();
            handleChangeState("");
            setAnchorEl(null);
          }}
        >
          Neutre
        </MenuItem>
        <Divider />
        <MenuItem
          component={NavLink}
          to={`/project/${
            currentProject.id
          }/${props?.task?.type.toLowerCase()}s/${props?.task?.id}`}
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            setAnchorEl(null);
          }}
        >
          Ouvrir la carte...
        </MenuItem>
        <MenuItem
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            duplicate(e);
            setAnchorEl(null);
          }}
        >
          Dupliquer...
        </MenuItem>
        <Divider />
        <MenuItem
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            e.stopPropagation();
            setModifMode(true);
            setAnchorEl(null);
          }}
        >
          Édition rapide...
        </MenuItem>
        <MenuItem
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            e.stopPropagation();
            setAnchorEl(null);
            setModifMode(true);
          }}
        >
          Édition avancée...
        </MenuItem>
        <Divider />
        <MenuItem
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            e.stopPropagation();
            setOpenAddContributorModal(true);
            setAnchorEl(null);
          }}
        >
          <p>Gérer les contributeurs...</p>
        </MenuItem>
        <span className={"divider"} />
        {events.map((category) => {
          if (category.title !== props?.task?.status)
            return (
              <MenuItem
                style={{ fontSize: "0.9rem" }}
                key={category.title}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveTo(category);
                }}
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
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            e.stopPropagation();
            setOpenDeleteModal(true);
            setAnchorEl(null);
          }}
        >
          <p>Archiver...</p>
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl2}
        open={openPopUp2}
        onClose={handleClose2}
        sx={{
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        <MenuItem
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            e.stopPropagation();
            setSubmitOnEnterMode(!submitOnEnterMode);
            setAnchorEl2(null);
          }}
        >
          {submitOnEnterMode
            ? "Désactiver la soumission rapide..."
            : "Activer la soumission rapide..."}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Card;
