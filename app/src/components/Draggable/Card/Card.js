import { useState } from "react";
import "./card.scss";
import Modal from "../../../materials/Modal/Modal";

const Card = (props) => {
  const [openModal, setOpenModal] = useState(false);

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
          {props.task.new && (
            <span className={"card__content__added__indicator"}>Ajoutée</span>
          )}
          {props.children}
        </div>
      </div>
      <Modal open={openModal} setOpen={setOpenModal}>
        <div className="modal__content__container">
          {Object.keys(props.task).map(function (key) {
            if (key === "id" || key === "new") return null;
            return (
              <div
                key={key}
                className="modal__content__container_scrollable_item_container"
              >
                <span>{key} : </span>
                <span className="modal__content__span__value">
                  {props.task[key]}
                </span>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default Card;
