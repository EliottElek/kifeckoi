import React, { useState } from "react";
import { Menu } from "@mui/material";
import { Context } from "../Context/Context";
import { MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import Modal from "../../materials/Modal/Modal";
import getPeriod from "../../assets/functions/getPeriod";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import AutoTextArea from "../../materials/AutoSizeTextArea/AutoSizeTextArea";
import Button from "../../materials/Button/Button";
import {
  useDeleteMultipleEvents,
  useChangeEventState,
  useCreateEvent,
} from "../../hooks/mutations/event";
import Row from "./Row/Row";
import "./EventList.scss";
import CheckBox from "../../materials/CheckBox/CheckBox";
import { useFindEventsByProjectId } from "../../hooks/queries/event";
import { useParams, useLocation } from "react-router";
const EventList = ({ type }) => {
  const {
    addCard,
    setAddCard,
    setSelectedEvents,
    selectedEvents,
    eventsData,
    setEventsData,
    user,
  } = React.useContext(Context);
  const { id } = useParams();
  const [selectAll, setSelectAll] = useState(false);
  const findEventsByProjectId = useFindEventsByProjectId({
    variables: { id: id, type: type },
    onCompleted: (data) => {
      setEventsData(data.findEventsByProjectId);
    },
  });
  const [selectedAcountables, setSelectedcontributors] = useState([]);
  const [input, setInput] = useState("");
  const location = useLocation();
  const createEvent = useCreateEvent();
  const deleteMultipleEvents = useDeleteMultipleEvents();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const changeEventState = useChangeEventState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopUp = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    if (findEventsByProjectId) {
      findEventsByProjectId.refetch();
    }
  }, [location, findEventsByProjectId]);
  const changeStateSelectedEvents = async (newState) => {
    try {
      selectedEvents.forEach(
        async (event) =>
          await changeEventState({
            variables: {
              eventId: event.id,
              newState: newState,
            },
          })
      );
      toast.success(
        `${selectedEvents.length} évènements passés en "${newState}".`,
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
      setSelectedEvents([]);
    } catch (err) {
      toast.warning(`Une erreur est surevenue.`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    findEventsByProjectId.refetch();
  };
  const selectAllEvents = () => {
    if (!selectAll) {
      setSelectedEvents([]);
      setSelectedEvents(
        eventsData.map((e) => {
          return { id: e.id };
        })
      );
      setSelectAll(false);
    } else {
      setSelectedEvents([]);
    }
  };
  const commentEnterSubmit = (e) => {
    if (e.key === "Enter" && e.shiftKey === false && input !== "") {
      return add(e);
    }
  };
  const add = async (e) => {
    if (input === "") return;
    e.preventDefault();
    const ArrayOfIds = selectedAcountables.map((acc) => acc.id);
    try {
      await createEvent({
        variables: {
          type: type,
          index: 0,
          projectId: id,
          creatorId: user.id,
          description: input,
          contributors: ArrayOfIds,
          status: "Nouveau",
          period: getPeriod(),
        },
      });
      setInput("");
      findEventsByProjectId.refetch();
      setSelectedcontributors([]);
    } catch (err) {
      toast.warning(`Impossible de créer l'évènement.`, {
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
  const handleDeleteSelectedEvents = async (e) => {
    try {
      const ids = selectedEvents.map((e) => e.id);
      const response = await deleteMultipleEvents({
        variables: {
          eventIds: ids,
        },
      });
      setSelectedEvents([]);
      toast(`${response.data.deleteMultipleEvents.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (err) {
      toast.error(
        "Impossible de supprimer ces évènements. Réessayez plus tard.",
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
    }
    findEventsByProjectId.refetch();
    setOpenDeleteModal(false);
  };
  return (
    <div className={"events__rows"}>
      <table className={"events__rows__container"}>
        <tr className={"events__rows__container__head"}>
          <th
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              height: "100%",
            }}
          >
            <CheckBox
              onClick={selectAllEvents}
              checked={selectAll}
              setChecked={setSelectAll}
            />
            <span
              style={{
                fontWeight: "normal",
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                selectedEvents.length > 0 && handleClick(e);
              }}
            >
              <FaChevronDown fontSize="0.6rem" />
            </span>
          </th>
          <th>Période</th>
          <th>Contributeurs</th>
          <th>Description</th>
          <th>Status</th>
          <th>État</th>
          <th></th>
        </tr>
        {eventsData.map((e, i) => (
          <Row
            key={i}
            type={type}
            task={e}
            findEventsByProjectId={findEventsByProjectId}
          />
        ))}
        {addCard && (
          <tr className={"event__row"}>
            <td></td>
            <td
              style={{ fontSize: "0.9rem" }}
              className={"current__period__row"}
            >
              {getPeriod()}
            </td>

            <td></td>
            <td>
              <form onSubmit={add}>
                <AutoTextArea
                  onKeyPress={commentEnterSubmit}
                  placeholder={"Titre de l'évènement..."}
                  onChange={(e) => setInput(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  value={input}
                  autoFocus
                  className="modif__description__textarea__row"
                ></AutoTextArea>
              </form>
            </td>
            <td style={{ fontSize: "0.9rem" }}>Nouveau</td>
            <td>
              <Button style={{ height: "30px" }} onClick={add}>
                Créer
              </Button>
            </td>
            <td style={{ padding: "4px" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setAddCard(false);
                }}
                className="clear__button"
              >
                <MdOutlineClear />
              </button>
            </td>
          </tr>
        )}
      </table>
      {!addCard && (
        <Button
          onClick={() => setAddCard(true)}
          style={{
            position: "sticky",
            bottom: "10px",
            margin: "10px",
            zIndex: 1,
          }}
        >
          Ajouter un évènement +
        </Button>
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
            <h3>
              Êtes-vous sûr(e) de vouloir supprimer {selectedEvents.length}{" "}
              évènement(s) ?
            </h3>
            {selectedEvents.length === 1 ? (
              <p>L'évènement suivant sera supprimé :</p>
            ) : (
              <p>
                Les {selectedEvents.length} évènement(s) suivants seront
                supprimés :
              </p>
            )}
            <ul
              style={{
                margin: "20px",
              }}
            >
              {selectedEvents.map((eve) => (
                <li
                  style={{
                    listStyle: "inside",
                  }}
                  key={eve.id}
                >
                  id : {eve.id}
                </li>
              ))}
            </ul>
            <p>La suppression sera définitive. </p>
          </div>
          <div
            className={"delete__actions__container"}
            style={{ position: "sticky", bottom: "12px" }}
          >
            <Button
              reversed
              onClick={() => {
                setOpenDeleteModal(false);
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleDeleteSelectedEvents}>Supprimer</Button>
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
          onClick={() => {
            changeStateSelectedEvents("Vérifié");
          }}
        >
          <span>Passer en "Vérifié"</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeStateSelectedEvents("À vérifier");
          }}
        >
          <span>Passer en "À vérifier"</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setOpenDeleteModal(true);
          }}
        >
          <span>Supprimer {selectedEvents?.length} évènement(s)</span>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default EventList;
