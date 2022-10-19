import React from "react";
import Modal from "../../../materials/Modal/Modal";
import formatDate from "../../../assets/functions/formatDate";
import getPeriod from "../../../assets/functions/getPeriod";
import { ImWarning } from "react-icons/im";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { MdOutlineClear, MdOutlineDeleteOutline } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import Button from "../../../materials/Button/Button";
import Progress from "../../../materials/Progress/Progress";
import Comments from "./Comments/Comments";
import { toast } from "react-toastify";
import ModifAreaCard from "./ModifAreaCard/ModifAreaCard";
import Avatar from "../../../materials/Avatar/Avatar";
import { Navigate, useNavigate, useParams } from "react-router";
import { useFindEventByEventId } from "../../../hooks/queries/event";
import AddContributorsEvent from "./AddContributorsEvent";
import {
  useCreateNotification,
  useMentionUsersInEvent,
  useChangeEventDescription,
  useDeleteEvent,
} from "../../../hooks/mutations/event";
import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { useSearchParams } from "react-router-dom";
const CardModal = () => {
  const { currentProject, user, dataEvents } = useContext(Context);
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [modifMode, setModifMode] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const mentionUsersInEvent = useMentionUsersInEvent();
  const createNotification = useCreateNotification();
  const changeEventDescription = useChangeEventDescription();
  const deleteEvent = useDeleteEvent();
  const [searchParams] = useSearchParams();
  const display = searchParams.get("display");
  const [openAddContributorModal, setOpenAddContributorModal] =
    React.useState(false);
  const [description, setDescription] = React.useState(null);

  const { data, loading, refetch } = useFindEventByEventId({
    variables: { id: eventId },
    onCompleted: (data) => {
      setEvent(data.findEventByEventId);
      setComments(data.findEventByEventId.comments);
      setDescription(data.findEventByEventId.description);
    },
  });
  const onClose = () => {
    navigate(
      `/project/${
        currentProject.id
      }/${event.type.toLowerCase()}?display=${display}`
    );
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
            eventId: event.id,
            userIds: mentionsIds,
            mentionContext: content.root.innerHTML,
          },
        });
        await createNotification({
          variables: {
            message: `${user?.firstname} vous a mentionné dans ${currentProject.name}.`,
            redirect: `/project/${
              currentProject.id
            }/${event.type.toLowerCase()}/${event.id}`,
            projectId: currentProject.id,
            emitterId: user.id,
            content: content.getText().toString(),
            receivers: mentionsIds,
          },
        });
      }
      await changeEventDescription({
        variables: {
          eventId: event.id,
          newDescription: content.root.innerHTML,
        },
      });
      dataEvents.refetch();
      setModifMode(false);
    } catch (err) {
      toast.error("Impossible de modifier la description.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  const handledeleteEvent = async (e) => {
    e.stopPropagation();
    try {
      await deleteEvent({
        variables: {
          eventId: event.id,
        },
      });
      dataEvents.refetch();
      toast(`${event.type} archivé(e) avec succès.`, {
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
    navigate(`/project/${currentProject.id}/${event.type.toLowerCase()}s`);
  };
  if (!data && !loading) return <Navigate to="/404" />;
  return (
    <>
      <Modal open={true} onClose={onClose} card>
        {loading ? (
          <div
            style={{
              minHeight: "600px",
              minWidth: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress sx={{ color: "var(--main-color)" }} />
          </div>
        ) : (
          <>
            <span className="id__span">{event?.id?.split("-")[0]}</span>
            <div className="modal__content__container" style={{ width: "95%" }}>
              <ModifAreaCard
                large
                event={event}
                value={description}
                setValue={setDescription}
                handleModifyDescription={handleModifyDescription}
                placeholder={"La carte doit avoir une description..."}
              />
              <div className="period__title__modal__container">
                <span
                  data-tip
                  data-for="periodTooltip"
                  className={`period__title__modal ${
                    event?.period === getPeriod()
                      ? "current__period"
                      : "previous__period"
                  }`}
                >
                  {event?.period}{" "}
                </span>
                {event?.period !== getPeriod() ? (
                  <span className="period__title__modal__warning__message">
                    <ImWarning color="var(--warning-color)" /> Cet évènement ne
                    date pas de cette semaine.
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
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <h2 className={"status__title__modal"}>{event?.status}</h2>
                  {event?.state === "Vérifié" && !modifMode && (
                    <span
                      data-tip
                      data-for="periodTooltip"
                      className={`modal__card__status__verified`}
                    >
                      {event?.state}
                      <AiOutlineCheck color="var(--check-color)" />
                    </span>
                  )}
                  {event?.state === "À vérifier" && !modifMode && (
                    <span
                      data-tip
                      data-for="periodTooltip"
                      className={`modal__card__status__to__verify`}
                    >
                      {event?.state} <BiTime color="var(--warning-color)" />
                    </span>
                  )}
                </div>
              </div>
              <span className="date__creator__span">
                <span>Le {formatDate(event?.creation)}</span>
                {event?.creator && (
                  <span>
                    {" "}
                    par {event?.creator.firstname} {event?.creator.lastname}
                  </span>
                )}
              </span>
              <button
                data-tip
                data-for="closeTooltip"
                onClick={() => {
                  onClose();
                  setModifMode(false);
                }}
                className="close__modal__button"
              >
                <MdOutlineClear />
              </button>
              {event?.contributors?.length !== 0 && (
                <div style={{ marginTop: "20px" }}>
                  <h3 style={{ marginBottom: "6px" }}>Contributeurs</h3>
                  <div className="kanban__section__content__name__container__avatars__container">
                    {event?.contributors?.map((acc, i) => (
                      <Avatar name={acc.username} src={acc.avatarUrl} key={i} />
                    ))}
                  </div>
                </div>
              )}
              {!comments ? (
                <Progress />
              ) : (
                <Comments comments={comments} event={event} refetch={refetch} />
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
                    setOpenAddContributorModal(true);
                  }}
                >
                  Gérer les contributeurs <BsPeopleFill fontSize={"1.2rem"} />
                </Button>
                <Button
                  style={{ height: "35px", display: "flex", gap: "4px" }}
                  reversed
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDeleteModal(true);
                  }}
                >
                  Supprimer <MdOutlineDeleteOutline fontSize={"1.2rem"} />
                </Button>
              </div>
            </div>
          </>
        )}
      </Modal>
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
      <AddContributorsEvent
        event={event}
        dataEvents={dataEvents}
        alreadyExistingContributors={event?.contributors}
        open={openAddContributorModal}
        setOpenAddContributorModal={setOpenAddContributorModal}
      />
    </>
  );
};

export default CardModal;
