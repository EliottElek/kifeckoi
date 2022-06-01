import Modal from "../../../materials/Modal/Modal";
import formatDate from "../../../assets/functions/formatDate";
import getPeriod from "../../../assets/functions/getPeriod";
import { ImWarning } from "react-icons/im";
import { AiOutlineCheckCircle, AiFillInfoCircle } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import Button from "../../../materials/Button/Button";
import Progress from "../../../materials/Progress/Progress";
import Comments from "./Comments/Comments";
import ModifAreaCard from "./ModifAreaCard/ModifAreaCard";
import Avatar from "../../../materials/Avatar/Avatar";
const CardModal = (props) => {
  return (
    <Modal open={props.openModal} setOpen={props.setOpenModal}>
      <div className="modal__content__container">
        <span>id : {props.task.id.split("-")[0]}</span>
        <ModifAreaCard
          large
          event={props.task}
          value={props.description}
          setValue={props.setDescription}
          handleModifyDescription={props.handleModifyDescription}
          placeholder={"La carte doit avoir une description..."}
        />
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
            {props.task.state === "Vérifié" && !props.modifMode && (
              <span
                data-tip
                data-for="periodTooltip"
                className={`modal__card__status__verified`}
              >
                {props.task.state}
                <AiOutlineCheck color="var(--check-color)" />
              </span>
            )}
            {props.task.state === "À vérifier" && !props.modifMode && (
              <span
                data-tip
                data-for="periodTooltip"
                className={`modal__card__status__to__verify`}
              >
                {props.task.state} <BiTime color="var(--warning-color)" />
              </span>
            )}
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
            props.handleCloseModal();
            props.setModifMode(false);
          }}
          className="close__modal__button"
        >
          <MdOutlineClear />
        </button>
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
        {!props.comments ? (
          <Progress />
        ) : (
          <Comments
            commentsData={props.commentsData}
            comments={props.comments}
            dataEvents={props.dataEvents}
            event={props.task}
          />
        )}
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
              props.setOpenAddContributorModal(true);
            }}
          >
            Gérer les contributeurs <BsPeopleFill fontSize={"1.2rem"} />
          </Button>
          <Button
            style={{ height: "35px", display: "flex", gap: "4px" }}
            reversed
            onClick={(e) => {
              e.stopPropagation();
              props.setOpenModal(false);
              props.setOpenDeleteModal(true);
            }}
          >
            Supprimer <MdOutlineDeleteOutline fontSize={"1.2rem"} />
          </Button>
        </div>
        <h3 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <AiFillInfoCircle /> Informations
        </h3>
        <p style={{ fontStyle: "italic" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis
          nibh non lorem vulputate egestas. Sed leo odio, dignissim ac
          sollicitudin eget, vehicula nec dui. Praesent in lorem ut augue
          lobortis suscipit.
        </p>
      </div>
    </Modal>
  );
};

export default CardModal;
