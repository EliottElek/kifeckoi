import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { FiMoreHorizontal } from "react-icons/fi";
import "./kanban.scss";
import Popup from "../../materials/Popup/Popup";
import ListItem from "../../materials/List/ListItem";
import List from "../../materials/List/List";

const Column = ({ droppableId, children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className={`kanban__section violet__back`}>
      <button
        onClick={() => setOpenMenu(true)}
        className="kanban__section__title__more__button"
      >
        <FiMoreHorizontal />
      </button>
      <Droppable droppableId={droppableId}>{children}</Droppable>
      <Popup open={openMenu} setOpen={setOpenMenu}>
        <List>
          <ListItem onClick={() => {}}>Archiver...</ListItem>
          <ListItem onClick={() => {}}>Dupliquer...</ListItem>
        </List>
      </Popup>
    </div>
  );
};

export default Column;
