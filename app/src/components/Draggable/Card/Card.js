import { useContext, useState } from "react";
import "./card.scss";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineClear } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import Modal from "../../../materials/Modal/Modal";
import Chip from "../../../materials/Chip/Chip";
import Avatars from "./Avatars";
import { CHANGE_ACTION_DESCRIPTION } from "../../../graphql/mutations";
import { Context } from "../../Context/Context";
import { useMutation } from "@apollo/client";

const Card = (props) => {
  const { setActions, actions, currentProject, setCurrentProject } =
    useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [modifMode, setModifMode] = useState(false);
  const [changeActionDescription] = useMutation(CHANGE_ACTION_DESCRIPTION);
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
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpenModal(true);
        }}
        className={"card"}
      >
        <div
          className={
            props.dragging ? "card__content dragging" : "card__content"
          }
        >
          <span className={"card__content__added__indicator validate"}>
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
          </span>
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
                focused
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
    </>
  );
};

export default Card;
