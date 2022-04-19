import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { FiMoreHorizontal } from "react-icons/fi";
import "./kanban.scss";
import Popup from "../../materials/Popup/Popup";
import MenuItem from "../../materials/Menu/MenuItem";
import Menu from "../../materials/Menu/Menu";

const Column = ({
  droppableId,
  children,
  setAddCard,
  section,
  setEventSelected,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className={`kanban__section`}>
      <button
        onClick={() => {
          setOpenMenu(true);
        }}
        className="kanban__section__title__more__button"
      >
        <FiMoreHorizontal />
      </button>
      <Droppable droppableId={droppableId}>{children}</Droppable>
      <Popup open={openMenu} setOpen={setOpenMenu}>
        <Menu>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(false);
              setEventSelected(section);
              setAddCard(true);
            }}
          >
            <p>Ajouter une carte...</p>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(false);
            }}
          >
            <p>Copier la liste...</p>
          </MenuItem>
          <span className={"divider"} />
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(false);
            }}
          >
            <p>Trier par date de création...</p>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(false);
            }}
          >
            <p>Trier par ordre alphabétique...</p>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(false);
            }}
          >
            <p>Afficher uniquement les actions vérifiées...</p>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(false);
            }}
          >
            <p>Afficher uniquement les actions à vérifier...</p>
          </MenuItem>
          <span className={"divider"} />
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(false);
            }}
          >
            <p>Déplacer toutes les cartes...</p>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(false);
            }}
          >
            <p>Archiver toutes les cartes...</p>
          </MenuItem>
        </Menu>
      </Popup>
    </div>
  );
};

export default Column;
