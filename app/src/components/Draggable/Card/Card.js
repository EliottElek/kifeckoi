import { useContext, useState } from "react";
import "./card.scss";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineClear } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { HiOutlineDuplicate } from "react-icons/hi";
import Modal from "../../../materials/Modal/Modal";
import Chip from "../../../materials/Chip/Chip";
import { Flip } from "react-toastify";

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
import List from "../../../materials/List/List";
import ListItem from "../../../materials/List/ListItem";

import { toast } from "react-toastify";
import { useParams } from "react-router";

const Card = (props) => {
  const { setActions, actions, currentProject, setCurrentProject } =
    useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [modifMode, setModifMode] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
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
      toast.error("Error Notification !", {
        position: toast.POSITION.TOP_LEFT,
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
              onClick={handleDeleteAction}
              className="kanban__section__content__name__container__edit__button"
            >
              <MdOutlineDeleteOutline />
            </button>

            <button
              onClick={handleMoreAction}
              className="kanban__section__content__name__container__edit__button more__button"
            >
              <FiMoreVertical />
            </button>
            <button
              onClick={duplicate}
              className="kanban__section__content__name__container__edit__button more__button"
            >
              <HiOutlineDuplicate />
            </button>
          </div>
          <div className={"card__content__added__indicator"}>
            {modifMode ? (
              <div className="kanban__section__content__name__container__button__container">
                <button
                  onClick={handleModifyDescription}
                  className="kanban__section__content__name__container__edit__button validate"
                >
                  <AiOutlineCheck />
                </button>
                <button
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
              <textarea
                autoFocus
                onChange={(e) => setDescription(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                value={description}
                className="modif__description__textarea"
              ></textarea>
            </form>
          ) : (
            <p>{props.task.description}</p>
          )}
          <Avatars users={props.task.accountables} />
        </div>
      </div>
      <Modal open={openModal} setOpen={setOpenModal}>
        <div className="modal__content__container">
          {Object.keys(props.task).map(function (key) {
            if (key === "id" || key === "new" || key === "__typename")
              return null;
            return (
              <div
                key={key}
                className="modal__content__container_scrollable_item_container"
              >
                {key !== "accountables" ? (
                  <>
                    <span>{key} : </span>
                    <span className="modal__content__span__value">
                      {props.task[key]}
                    </span>
                  </>
                ) : (
                  <>
                    <span>accountables : </span>
                    {props.task.accountables.map((accountable) => (
                      <Chip
                        key={accountable.id}
                        text={accountable.username}
                        src={accountable.avatarUrl}
                      />
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Modal>
      <Popup open={openPopUp} setOpen={setOpenPopUp} bottom>
        <List>
          {actions.map((category) => {
            if (category.title !== props.task.status)
              return (
                <ListItem
                  key={category.title}
                  onClick={() => handleMoveTo(category)}
                >
                  <p>
                    Déplacer vers{" "}
                    <span className={"underlined"}>{category.title}</span>...
                  </p>
                </ListItem>
              );
            else return null;
          })}
          <ListItem
            onClick={(e) => {
              handleDeleteAction(e);
              setOpenPopUp(false);
            }}
          >
            <p>Archiver...</p>
          </ListItem>
          <ListItem
            onClick={(e) => {
              duplicate(e);
              setOpenPopUp(false);
            }}
          >
            <p>Dupliquer...</p>
          </ListItem>
        </List>
      </Popup>
    </>
  );
};

export default Card;
