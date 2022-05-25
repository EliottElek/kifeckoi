import { useContext, useState, useEffect } from "react";
import "../Card/card.scss";
import "./Row.scss";
import "../kanban.scss";
import "../../Client/RecentEvents/RecentEvents.css";
import "../../GlobalInfos/GlobalInfos.scss";
import { BiTime } from "react-icons/bi";
import { MdOutlineClear } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineCheck, AiFillInfoCircle } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { ImWarning } from "react-icons/im";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import Modal from "../../../materials/Modal/Modal";
import ReactTooltip from "react-tooltip";
import AddContributorsEvent from "../Card/AddContributorsEvent";
import {
  CHANGE_EVENT_DESCRIPTION,
  CHANGE_EVENT_STATUS,
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
import Progress from "../../../materials/Progress/Progress";
import Comments from "../Card/Comments/Comments";
import Button from "../../../materials/Button/Button";
import ModifAreaCard from "../Card/ModifAreaCard/ModifAreaCard";
import shortString from "../../../assets/functions/shortString";
import getPeriod from "../../../assets/functions/getPeriod";
import Avatar from "../../../materials/Avatar/Avatar";
import formatDate from "../../../assets/functions/formatDate";
import CheckBox from "../../../materials/CheckBox/CheckBox";
const Row = (props) => {
  const {
    setEvents,
    events,
    currentProject,
    setCurrentProject,
    user,
    selectedEvents,
    setSelectedEvents,
  } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddContributorModal, setOpenAddContributorModal] = useState(false);
  const [modifMode, setModifMode] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [comments, setComments] = useState([]);
  const [checked, setChecked] = useState(false);
  const [changeEventDescription] = useMutation(CHANGE_EVENT_DESCRIPTION);
  const [changeEventStatus] = useMutation(CHANGE_EVENT_STATUS);
  const [changeEventState] = useMutation(CHANGE_EVENT_STATE);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [createEvent] = useMutation(CREATE_EVENT);
  const [description, setDescription] = useState(props.task.description);

  useEffect(() => {
    if (selectedEvents.find((e) => e.id === props.task.id)) setChecked(true);
    else {
      setChecked(false);
    }
  }, [selectedEvents, props.task.id, setChecked]);
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
      props.dataEvents.refetch();
      setModifMode(false);
    } catch (err) {
      toast.error("Impossible de modifier la description.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  const handleCloseModal = () => {
    setModifMode(false);
    setOpenModal(false);
  };
  const handleSelect = () => {
    if (!checked) {
      setSelectedEvents((prev) => [...prev, { id: props.task.id }]);
    } else {
      const newSelected = selectedEvents.filter(
        (ev) => ev.id !== props.task.id
      );
      setSelectedEvents(newSelected);
    }
  };
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
      await changeEventStatus({
        variables: {
          eventId: props.task.id,
          newStatus: category?.title,
        },
      });
      props.dataEvents.refetch();

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
        pauseOnHover: false,
      });
    }
    setEvents([...events]);
    currentProject.events = [...events];
    setCurrentProject(currentProject);
  };
  const handleChangeState = async (newState) => {
    if (props.task.state === newState) return;
    try {
      await changeEventState({
        variables: {
          eventId: props.task.id,
          newState: newState,
        },
      });
      props.dataEvents.refetch();
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
    try {
      await deleteEvent({
        variables: {
          eventId: props.task.id,
        },
      });
      setModifMode(false);
      props.dataEvents.refetch();

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
          period: getPeriod(),
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
      props.dataEvents.refetch();

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
    setOpenPopUp(true);
  };
  if (props.add) return <div className="card">{props.children}</div>;
  const Msg = ({ children }) => <div>{children}</div>;
  return (
    <tr
      className={"event__row"}
      onClick={() => {
        if (!openPopUp) {
          setOpenModal(true);
        } else setOpenPopUp(false);
      }}
    >
      <td>
        <CheckBox
          onClick={handleSelect}
          style={{ margin: "0px" }}
          setChecked={setChecked}
          checked={checked}
        />
      </td>
      <td
        style={{ fontSize: "0.9rem" }}
        className={
          props?.task?.period === getPeriod()
            ? "current__period__row"
            : "previous__period__row"
        }
      >
        {props?.task?.period}
      </td>
      {props?.task?.contributors?.length === 0 ? (
        <td style={{ fontStyle: "italic", fontSize: "0.8rem" }}>
          Aucun contributeur.
        </td>
      ) : (
        <td style={{ fontSize: "0.9rem" }}>
          <strong>{props?.task?.contributors?.length}</strong> contributeur(s)
        </td>
      )}
      <td style={{ fontSize: "0.9rem" }}>
        {shortString(props.task.description, user.maxCaractersCard)}
      </td>
      <td style={{ fontSize: "0.9rem" }}>{props?.task?.status}</td>
      <td>
        {props.task.state === "Vérifié" && (
          <span
            data-tip
            style={{ fontSize: "0.9rem" }}
            data-for="periodTooltip"
            className={`modal__card__status__verified`}
          >
            {props.task.state}
            <AiOutlineCheck color="var(--check-color)" />
          </span>
        )}
        {props.task.state === "À vérifier" && (
          <span
            style={{ fontSize: "0.9rem" }}
            data-tip
            data-for="periodTooltip"
            className={`modal__card__status__to__verify`}
          >
            {props.task.state} <BiTime color="var(--warning-color)" />
          </span>
        )}
      </td>
      <td>
        <button
          data-tip
          data-for="moreTooltip"
          onClick={handleMoreAction}
          className="kanban__section__content__name__container__edit__button more__button"
        >
          <FiMoreHorizontal />
        </button>
      </td>
      <Modal open={openModal} setOpen={handleCloseModal}>
        <div className="modal__content__container">
          <div className="period__title__modal__container">
            <span
              data-tip
              data-for="periodTooltip"
              className={`period__title__modal ${
                props.task.period === getPeriod()
                  ? "current__period"
                  : "previous__period"
              }`}
            >
              {props.task.period}{" "}
            </span>
            {props.task.period !== getPeriod() ? (
              <span className="period__title__modal__warning__message">
                <ImWarning color="var(--warning-color)" /> Cet évènement ne date
                pas de cette semaine.
              </span>
            ) : (
              <span className="period__title__modal__warning__message">
                <AiOutlineCheckCircle
                  color="var(--check-color)"
                  fontSize={"1.2rem"}
                />{" "}
                Cet évènement a été créé cette semaine.
              </span>
            )}
          </div>
          <div
            style={{
              marginTop: "38px",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <h2 className={"status__title__modal"}>{props.task.status}</h2>
              {props.task.state === "Vérifié" && !modifMode && (
                <span
                  data-tip
                  data-for="periodTooltip"
                  className={`modal__card__status__verified`}
                >
                  {props.task.state}
                  <AiOutlineCheck color="var(--check-color)" />
                </span>
              )}
              {props.task.state === "À vérifier" && !modifMode && (
                <span
                  data-tip
                  data-for="periodTooltip"
                  className={`modal__card__status__to__verify`}
                >
                  {props.task.state} <BiTime color="var(--warning-color)" />
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginRight: "4px",
              }}
            >
              <Button
                style={{ height: "35px", display: "flex", gap: "4px" }}
                reversed
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenAddContributorModal(true);
                  // setOpenModal(false);
                }}
              >
                Gérer les contributeurs <BsPeopleFill fontSize={"1.2rem"} />
              </Button>
              <Button
                style={{ height: "35px", display: "flex", gap: "4px" }}
                reversed
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(false);
                  setOpenDeleteModal(true);
                }}
              >
                Supprimer <MdOutlineDeleteOutline fontSize={"1.2rem"} />
              </Button>
            </div>
          </div>
          <span className="date__creator__span">
            <span>Le {formatDate(props.task.creation)}</span>
            {props.task.creator && (
              <span>
                {" "}
                par {props.task.creator.firstname} {props.task.creator.lastname}
              </span>
            )}
          </span>
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
          <ModifAreaCard
            event={props.task}
            value={description}
            setValue={setDescription}
            handleModifyDescription={handleModifyDescription}
            placeholder={"La carte doit avoir une description..."}
          />
          {props?.task?.contributors?.length !== 0 && (
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ marginBottom: "6px" }}>Contributeurs</h3>
              <div className="kanban__section__content__name__container__avatars__container">
                {props?.task?.contributors?.map((acc, i) => (
                  <Avatar name={acc.username} src={acc.avatarUrl} key={i} />
                ))}
              </div>
            </div>
          )}
          {!comments ? (
            <Progress />
          ) : (
            <Comments
              commentsData={commentsData}
              comments={comments}
              dataEvents={props.dataEvents}
              event={props.task}
            />
          )}
          <h3 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <AiFillInfoCircle /> Informations
          </h3>
          <p style={{ fontStyle: "italic" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            convallis nibh non lorem vulputate egestas. Sed leo odio, dignissim
            ac sollicitudin eget, vehicula nec dui. Praesent in lorem ut augue
            lobortis suscipit.
          </p>
        </div>
      </Modal>
      <Popup
        open={openPopUp}
        setOpen={setOpenPopUp}
        style={{ transform: "translate(-10px,0px)" }}
      >
        <Menu>
          <MenuItem
            style={{ backgroundColor: "green" }}
            onClick={(e) => {
              e.stopPropagation();
              handleChangeState("Vérifié");
              setOpenPopUp(false);
            }}
          >
            <p>Vérifié</p>
          </MenuItem>
          <MenuItem
            style={{ backgroundColor: "red" }}
            onClick={(e) => {
              e.stopPropagation();
              handleChangeState("À vérifier");
              setOpenPopUp(false);
            }}
          >
            <p>À vérifier</p>
          </MenuItem>
          <span className={"divider"} />
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
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setOpenAddContributorModal(true);
              setOpenPopUp(false);
            }}
          >
            <p>Gérer les contributeurs...</p>
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
              e.stopPropagation();
              setOpenDeleteModal(true);
              setOpenPopUp(false);
            }}
          >
            <p>Archiver...</p>
          </MenuItem>
        </Menu>
      </Popup>
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
        event={props.task}
        dataEvents={props.dataEvents}
        dataProject={props.dataProject}
        alreadyExistingContributors={props.task.contributors}
        open={openAddContributorModal}
        setOpen={setOpenAddContributorModal}
      />
      <Modal open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <div className="modal__content__container space__between">
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
            <h3>Êtes-vous sûr(e) de vouloir supprimer cet évènement ?</h3>
            <p>La suppression sera définitive. </p>
          </div>
          <div className={"delete__actions__container"}>
            <Button
              reversed
              onClick={() => {
                setOpenDeleteModal(false);
                setOpenModal(false);
              }}
            >
              Annuler
            </Button>
            <Button onClick={handledeleteEvent}>Supprimer</Button>
          </div>
        </div>
      </Modal>
    </tr>
  );
};

export default Row;
