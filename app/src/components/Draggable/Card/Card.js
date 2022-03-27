import { useContext, useState } from "react";
import "./card.scss";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineClear } from "react-icons/md";
import { BsArchiveFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";

import Modal from "../../../materials/Modal/Modal";
import Chip from "../../../materials/Chip/Chip";
import Avatars from "./Avatars";
import {
  CHANGE_ACTION_DESCRIPTION,
  CHANGE_ACTION_STATE,
  DELETE_ACTION,
} from "../../../graphql/mutations";
import { Context } from "../../Context/Context";
import { useMutation } from "@apollo/client";
import Popup from "../../../materials/Popup/Popup";
import List from "../../../materials/List/List";
import ListItem from "../../../materials/List/ListItem";

const Card = (props) => {
  const {
    setActions,
    actions,
    currentProject,
    setCurrentProject,
    setAlertContent,
    setOpenAlert,
  } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [modifMode, setModifMode] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [changeActionDescription] = useMutation(CHANGE_ACTION_DESCRIPTION);
  const [changeActionState] = useMutation(CHANGE_ACTION_STATE);
  const [deleteAction] = useMutation(DELETE_ACTION);

  const [description, setDescription] = useState(props.task.description);

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
    const sourceColIndex = actions.findIndex(
      (e) => e.title === props.task.status
    );
    const destinationColIndex = actions.findIndex((e) => e.id === category.id);

    const sourceCol = actions[sourceColIndex];
    const destinationCol = actions[destinationColIndex];

    const sourceTask = [...sourceCol.tasks];
    const destinationTask = [...destinationCol.tasks];

    const index = sourceTask.findIndex((task) => task.id === props.task.id);
    const [removed] = sourceTask.splice(index, 1);
    destinationTask.splice(0, 0, removed);

    actions[sourceColIndex].tasks = sourceTask;
    actions[destinationColIndex].tasks = destinationTask;
    try {
      await changeActionState({
        variables: {
          actionId: props.task.id,
          newStatus: category?.title,
        },
      });
      setOpenPopUp(false);
    } catch (err) {
      setAlertContent({
        content: "Une erreur est survenue. L'action n'a pas pu être déplacée.",
        type: "warning",
      });
      setOpenAlert(true);
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
      console.log(itemsD);
      const newArray = itemsD.filter((item) => item.id !== props.task.id);
      actions[index].tasks = [...newArray];
      setActions([...actions]);
      currentProject.actions = [...actions];
      setCurrentProject(currentProject);
      setModifMode(false);
      setModifMode(false);
      setAlertContent({
        content: "L'action est maintenant dans les archives.",
        type: "",
      });
      setOpenAlert(true);
    } catch (err) {
      setAlertContent({
        content: "Une erreur est survenue. L'action n'a pas pu être archivée.",
        type: "warning",
      });
      setOpenAlert(true);
      console.log(err);
    }
  };
  const handleMoreAction = (e) => {
    e.stopPropagation();
    setOpenPopUp(true);
  };
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
          <div className="card__content__added__indicator bottom__button">
            <button
              onClick={handleDeleteAction}
              className="kanban__section__content__name__container__edit__button delete__button"
            >
              <BsArchiveFill />
            </button>
          </div>
          <div className="card__content__added__indicator more__button bottom__button">
            <button
              onClick={handleMoreAction}
              className="kanban__section__content__name__container__edit__button more__button"
            >
              <FiMoreVertical />
            </button>
          </div>
          <div className={"card__content__added__indicator"}>
            {modifMode ? (
              <>
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
              </>
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
        </List>
      </Popup>
    </>
  );
};

export default Card;
