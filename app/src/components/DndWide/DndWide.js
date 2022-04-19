import { useContext, useEffect } from "react";
import { Context } from "../Context/Context";
import EventKanban from "../Draggable/EventKanban";
import TableEvents from "../Project/TableEvents/TableEvents";
import ReactTooltip from "react-tooltip";
import "./DndWide.scss";
const DndWide = ({ type }) => {
  const { currentProject, listStyle, markdown } = useContext(Context);
  useEffect(() => {
    if (currentProject) {
      const title = document.getElementById("title");
      title.innerHTML = `${currentProject?.name}-${type}s | Kifekoi`;
    }
  }, [currentProject?.name, currentProject, type]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          padding: "5px",
          marginTop: "45px",
        }}
        className={"dnd__wide__container"}
      >
        {listStyle ? <TableEvents type={type} /> : <EventKanban type={type} />}
      </div>
      <ReactTooltip delayShow={500} id="ListTooltip" effect="solid">
        {!listStyle ? (
          <span>Afficher sous forme de liste</span>
        ) : (
          <span>Désactiver la vue en liste</span>
        )}
      </ReactTooltip>
      <ReactTooltip delayShow={500} id="MarkdownTooltip" effect="solid">
        {!markdown ? (
          <span>Activer la mise en forme</span>
        ) : (
          <span>Désactiver la mise en forme</span>
        )}
      </ReactTooltip>
    </div>
  );
};

export default DndWide;
