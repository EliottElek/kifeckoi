import React, { useContext, useState, useEffect } from "react";
import "../../Draggable/Card/card.scss";
import "./Row.scss";
import "../../Draggable/kanban.scss";
import "../../GlobalInfos/GlobalInfos.scss";
import { BiTime } from "react-icons/bi";
import { MdOutlineClear } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import Modal from "../../../materials/Modal/Modal";
import ReactTooltip from "react-tooltip";
import { Divider } from "@mui/material";
import {
  useChangeEventStatus,
  useChangeEventState,
  useDeleteEvent,
  useCreateEvent,
} from "../../../hooks/mutations/event";
import { Context } from "../../Context/Context";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { Menu } from "@mui/material";
import Button from "../../../materials/Button/Button";
import shortString from "../../../assets/functions/shortString";
import getPeriod from "../../../assets/functions/getPeriod";
import CheckBox from "../../../materials/CheckBox/CheckBox";
import RenderHtml from "../../../assets/RenderHtml";
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
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const changeEventStatus = useChangeEventStatus();
  const changeEventState = useChangeEventState();
  const deleteEvent = useDeleteEvent();
  const createEvent = useCreateEvent();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopUp = Boolean(anchorEl);
  const [searchParams] = useSearchParams();
  const display = searchParams.get("display");
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  useEffect(() => {
    if (selectedEvents.find((e) => e.id === props.task.id)) setChecked(true);
    else {
      setChecked(false);
    }
  }, [selectedEvents, props.task.id, setChecked]);
  const { id } = useParams();
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
      changeEventStatus({
        variables: {
          eventId: props.task.id,
          newStatus: category?.title,
        },
      });
      props.findEventsByProjectId.refetch();

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
      changeEventState({
        variables: {
          eventId: props.task.id,
          newState: newState,
        },
      });
      props.findEventsByProjectId.refetch();
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
      props.findEventsByProjectId.refetch();

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
      props.findEventsByProjectId.refetch();
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

  if (props.add) return <div className="card">{props.children}</div>;
  const Msg = ({ children }) => <div>{children}</div>;
  return (
    <tr
      className={"event__row"}
      onClick={() => {
        navigate(
          `/project/${currentProject.id}/${props.task.type.toLowerCase()}/${
            props.task.id
          }?display=${display}`
        );
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
        <RenderHtml>{shortString(props.task.description, 80)}</RenderHtml>
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
          onClick={handleClick}
          className="kanban__section__content__name__container__edit__button more__button"
        >
          <FiMoreHorizontal />
        </button>
      </td>
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
            <h3>Êtes-vous sûr(e) de vouloir supprimer cet évènement ?</h3>
            <p>La suppression sera définitive. </p>
          </div>
          <div className={"delete__actions__container"}>
            <Button
              reversed
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteModal(false);
                navigate(
                  `/project/${
                    currentProject.id
                  }/${props.task.type.toLowerCase()}s`
                );
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
        <Divider />
        <MenuItem
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {
            navigate(
              `/project/${
                currentProject.id
              }/${props.task.type.toLowerCase()}s/${props.task.id}`
            );
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
        <span className={"divider"} />
        {events.map((category) => {
          if (category.title !== props.task.status)
            return (
              <MenuItem
                style={{ fontSize: "0.9rem" }}
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
    </tr>
  );
};

export default Row;
