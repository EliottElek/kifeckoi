import { useContext, useState, useEffect } from "react";
import "./card.scss";
import "../../Client/RecentActions/RecentActions.css";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineClear } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { FiMoreVertical, FiMoreHorizontal } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";
import Modal from "../../../materials/Modal/Modal";
import Chip from "../../../materials/Chip/Chip";
import { Flip } from "react-toastify";
import ReactTooltip from "react-tooltip";
import Avatars from "./Avatars";
import {
  CHANGE_ACTION_DESCRIPTION,
  CHANGE_ACTION_STATE,
  DELETE_ACTION,
  CREATE_ACTION,
} from "../../../graphql/mutations";
import { Context } from "../../Context/Context";
import { useMutation } from "@apollo/client";
import Popup from "../../../materials/Popup/Popup";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import MenuItem from "../../../materials/Menu/MenuItem";
import Menu from "../../../materials/Menu/Menu";
import AutoTextArea from "../../../materials/AutoSizeTextArea/AutoSizeTextArea";
import ReactMarkdown from "../../../assets/ReactMarkdown";
const Card = (props) => {
  const { setActions, actions, currentProject, setCurrentProject } =
    useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(false);
  const [modifMode, setModifMode] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openEditPopUp, setOpenEditPopUp] = useState(false);
  const [submitOnEnterMode, setSubmitOnEnterMode] = useState(false);
  const [changeActionDescription] = useMutation(CHANGE_ACTION_DESCRIPTION);
  const [changeActionState] = useMutation(CHANGE_ACTION_STATE);
  const [deleteAction] = useMutation(DELETE_ACTION);
  const [createAction] = useMutation(CREATE_ACTION);

  const [description, setDescription] = useState(props.task.description);
  const { id } = useParams();
  const handleModifyDescription = async (e) => {
    e.stopPropagation();
    try {
      await changeActionDescription({
        variables: {
          actionId: props.task.id,
          newDescription: description,
        },
      });
      const index = actions.findIndex((e) => e.title === props.task.status);
      const items = [...actions[index].tasks];
      const itemsD = JSON.parse(JSON.stringify(items));

      const item = itemsD.find((item) => item.id === props.task.id);
      item.description = description;
      actions[index].tasks = itemsD;
      setActions([...actions]);
      currentProject.actions = [...actions];
      setCurrentProject(currentProject);
      setModifMode(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (props.task.status === "Réalisé") setStatus("action__green");
    else if (props.task.status === "En cours") setStatus("action__marron");
    else if (props.task.status === "Nouveau") setStatus("action__blue");
    else if (props.task.status === "À planifier") setStatus("action__orange");
  }, [props.task.status, setStatus]);
  const handleMoveTo = async (category) => {
    try {
      const sourceColIndex = actions.findIndex(
        (e) => e.title === props.task.status
      );
      const destinationColIndex = actions.findIndex(
        (e) => e.id === category.id
      );
      const sourceCol = actions[sourceColIndex];
      const destinationCol = actions[destinationColIndex];
      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];
      const index = sourceTask.findIndex((task) => task.id === props.task.id);
      const [removed] = sourceTask.splice(index, 1);
      destinationTask.splice(0, 0, removed);

      actions[sourceColIndex].tasks = sourceTask;
      actions[destinationColIndex].tasks = destinationTask;
      await changeActionState({
        variables: {
          actionId: props.task.id,
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
      toast.error("Impossible de déplacer l'action.", {
        position: toast.POSITION.BOTTOM_LEFT,
        transition: Flip,
      });
      console.log(err);
    }
    setActions([...actions]);
    currentProject.actions = [...actions];
    setCurrentProject(currentProject);
  };

  const handleDeleteAction = async (e) => {
    e.stopPropagation();
    try {
      await deleteAction({
        variables: {
          actionId: props.task.id,
        },
      });
      const index = actions.findIndex((e) => e.title === props.task.status);
      const items = [...actions[index].tasks];
      const itemsD = JSON.parse(JSON.stringify(items));
      const newArray = itemsD.filter((item) => item.id !== props.task.id);
      actions[index].tasks = [...newArray];
      setActions([...actions]);
      currentProject.actions = [...actions];
      setCurrentProject(currentProject);
      setModifMode(false);
      toast("Action archivée avec succès.", {
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
      toast.waning("Impossible de supprimer l'action. Réessayez plus tard.", {
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
      const ArrayOfIds = props.task.accountables.map((acc) => acc.id);

      const newAction = await createAction({
        variables: {
          name: "Action",
          projectId: id,
          description: props.task.description,
          accountables: ArrayOfIds,
          status: props.task.status,
        },
      });
      const index = actions.findIndex(
        (action) => action.title === props.task.status
      );
      actions[index].tasks.splice(actions[index] + 1, 0, {
        ...newAction?.data?.createAction,
        new: true,
      });
      setActions([...actions]);
      currentProject.actions = [...actions];
      setCurrentProject(currentProject);

      props.setLength && props.setLength(props.length + 1);
      toast(
        `${
          newAction?.data?.createAction
            ? newAction?.data?.createAction.name
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
          if (!openPopUp) setOpenModal(true);
          else setOpenPopUp(false);
        }}
        className={"card"}
      >
        <div
          className={
            props.dragging ? "card__content dragging" : "card__content"
          }
        >
          <div className="card__content__actions__container">
            <button
              data-tip
              data-for="archiveTooltip"
              onClick={handleDeleteAction}
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
          {props.type === "info" && (
            <span className="card__icon">
              <i className="gg-info"></i>
              Info
            </span>
          )}
          {props.type === "action" && (
            <span className="card__icon violet">
              <i className="gg-arrows-exchange-alt"></i> Action
            </span>
          )}
          {props.type === "decision" && (
            <span className="card__icon marron">
              <i className="gg-alarm"></i> Décision
            </span>
          )}
          {props.type === "risk" && (
            <span className="card__icon orange">
              <i className="gg-bell"></i> Risque
            </span>
          )}
          {props.type === "problem" && (
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
                oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                onChange={(e) => setDescription(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                value={description}
                className="modif__description__textarea"
              ></AutoTextArea>
            </form>
          ) : (
            <div className="card__description">
              <ReactMarkdown>{props.task.description}</ReactMarkdown>
            </div>
          )}
          <Avatars users={props.task.accountables} />
        </div>
      </div>
      <Modal open={openModal} setOpen={setOpenModal}>
        <div className="modal__content__container">
          <AutoTextArea
            disabled
            className="modif__description__textarea"
            value={props.task.description}
            style={{
              width: "100%",
              fontSize: "2rem!important",
            }}
          />
          <span>
            Status : <span className={status}>{props.task.status}</span>
          </span>
          {props.task.accountables.length !== 0 && (
            <div className="kanban__section__content__name__container__avatars__container">
              <span>Responsables : </span>
              <div className="kanban__section__content__name__container__avatars__container">
                {props.task.accountables.map((acc) => (
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
          </span>
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
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setModifMode(true);
              setOpenPopUp(false);
            }}
          >
            <p>Éditer...</p>
          </MenuItem>
          <span className={"divider"} />
          {actions.map((category) => {
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
              handleDeleteAction(e);
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
