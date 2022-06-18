import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FiMoreHorizontal } from "react-icons/fi";
import "./kanban.scss";
import { BiPlus } from "react-icons/bi";
import { Menu, MenuItem } from "@mui/material";

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
  const openPopUp = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          </Menu>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
