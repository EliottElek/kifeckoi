import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FiMoreHorizontal } from "react-icons/fi";
import "./kanban.scss";
import { MdOutlineClear } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import { Divider, Menu, MenuItem } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import Modal from "../../materials/Modal/Modal";
import Button from "../../materials/Button/Button";
import {
  useDeleteEventsStatus,
  useRenameEventsStatus,
} from "../../hooks/mutations/project/eventsStatus";
import { toast } from "react-toastify";
import { Context } from "../Context/Context";
import { capitalizeFirst } from "../../utils/capitalizeFirst";
import { useParams } from "react-router";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "transparent",
    color: "var(--font-color)",
    border: "1px solid #ced4da",
    fontSize: "1.2rem",
    fontWeight: "bold",
    display: "flex",
    flexGrow: 1,
    padding: "0px 2px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: "var(--main-color)",
    },
  },
}));
const Column = ({
  droppableId,
  children,
  setAddCard,
  section,
  setEventSelected,
  index,
}) => {
  //open the menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { dataEvents } = React.useContext(Context);
  const openPopUp = Boolean(anchorEl);
  const { schema } = useParams();
  const [newTitle, setNewTitle] = React.useState("");
  const [editMode, setEditMode] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const renameEventsStatus = useRenameEventsStatus();
  const deleteEventsStatus = useDeleteEventsStatus();
  const type = capitalizeFirst(schema);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteEventsStatus = async () => {
    try {
      await deleteEventsStatus({
        variables: {
          id: droppableId,
          type: type,
        },
      });
      dataEvents.refetch();
    } catch (err) {
      toast.error("Impossible de supprimer la colonne.");
      console.log(err);
    }
  };
  const handleRenameEventsStatus = async (section) => {
    if (section.title === newTitle) {
      setEditMode(false);
      return;
    }
    try {
      await renameEventsStatus({
        variables: {
          id: section.id,
          title: newTitle,
          type: type,
        },
      });
      setEditMode(false);
      dataEvents.refetch();
    } catch (err) {
      toast.error("Impossible de modifier la colonne.");
      console.log(err);
    }
  };
  return (
    <Draggable draggableId={"col" + droppableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`kanban__section`}
        >
          {editMode ? (
            <h2 className={`kanban__section__title`}>
              <BootstrapInput
                autoFocus
                value={newTitle}
                onBlur={() => handleRenameEventsStatus(section)}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </h2>
          ) : (
            <h2
              onClick={() => {
                setNewTitle(section.title);
                setEditMode(true);
              }}
              className={`kanban__section__title`}
            >
              {section?.title} ({section?.tasks?.length})
            </h2>
          )}
          <button
            onClick={handleClick}
            className="kanban__section__title__more__button"
          >
            <FiMoreHorizontal />
          </button>
          <div className={`kanban__section__overflow`}>
            <Droppable droppableId={droppableId} type="card">
              {children}
            </Droppable>
          </div>
          <button
            onClick={() => {
              setEventSelected(section);
              setAddCard(true);
            }}
            className={`kanban__section__title__button`}
          >
            <BiPlus /> Ajouter une carte
          </button>
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
                setAnchorEl(null);
              }}
            >
              <p>Copier la liste...</p>
            </MenuItem>
            <span className={"divider"} />
            <MenuItem
              style={{ fontSize: "0.9rem" }}
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(null);
              }}
            >
              <p>Trier par date de création...</p>
            </MenuItem>
            <MenuItem
              style={{ fontSize: "0.9rem" }}
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(null);
              }}
            >
              <p>Trier par ordre alphabétique...</p>
            </MenuItem>
            <MenuItem
              style={{ fontSize: "0.9rem" }}
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(null);
              }}
            >
              <p>Afficher uniquement les actions vérifiées...</p>
            </MenuItem>
            <MenuItem
              style={{ fontSize: "0.9rem" }}
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(null);
              }}
            >
              <p>Afficher uniquement les actions à vérifier...</p>
            </MenuItem>
            <span className={"divider"} />
            <MenuItem
              style={{ fontSize: "0.9rem" }}
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(null);
              }}
            >
              <p>Déplacer toutes les cartes...</p>
            </MenuItem>
            <MenuItem
              style={{ fontSize: "0.9rem" }}
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(null);
              }}
            >
              <p>Archiver toutes les cartes...</p>
            </MenuItem>
            <Divider />
            <MenuItem
              style={{ fontSize: "0.9rem", color: "red" }}
              onClick={(e) => {
                e.stopPropagation();
                section?.tasks?.length === 0
                  ? handleDeleteEventsStatus()
                  : setOpenDeleteModal(true);
              }}
            >
              <p>Supprimer la colonne</p>
            </MenuItem>
          </Menu>
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
                <h3>Êtes-vous sûr de vouloir supprimer cette colonne ?</h3>
                <p>
                  Tous les évènements de cette colonne seront également
                  supprimés.
                </p>
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
                <Button onClick={handleDeleteEventsStatus}>Supprimer</Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
