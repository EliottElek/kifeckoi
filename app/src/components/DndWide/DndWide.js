import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/Context";
import EventKanban from "../Draggable/EventKanban";
import StickyNavbar from "../StickyNavbar/StickyNavbar";
import Button from "../../materials/Button/Button";
import TableEvents from "../Project/TableEvents/TableEvents";
import { BsListTask } from "react-icons/bs";
import { CgFormatUppercase } from "react-icons/cg";
import ReactTooltip from "react-tooltip";
import Switch from "../../materials/Switch/Switch";
const DndWide = ({ type }) => {
  const {
    currentProject,
    listStyle,
    setListStyle,
    setEvents,
    setMarkdown,
    markdown,
    toggleTheme,
    defaultDark,
  } = useContext(Context);
  const navigate = useNavigate();
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
      <StickyNavbar>
        <div className="name__container">
          <Button
            onClick={() => {
              navigate(`/project/${currentProject.id}`);
            }}
          >
            <i className="gg-chevron-left"></i>Retour
          </Button>
          <h2 className="name__container__title">
            {currentProject?.name} - {type}s
          </h2>
          <button
            data-tip
            onClick={(e) => {
              e.stopPropagation();
              setEvents(null);
              setListStyle(!listStyle);
            }}
            data-for="ListTooltip"
            className={`list__style__button ${
              listStyle && " active__list__style"
            }`}
          >
            <BsListTask />
          </button>
          <button
            data-tip
            onClick={(e) => {
              e.stopPropagation();
              setMarkdown(!markdown);
            }}
            data-for="MarkdownTooltip"
            className={`list__style__button markdown__btn ${
              markdown && " active__list__style"
            }`}
          >
            <CgFormatUppercase />
          </button>
        </div>
        <div className="events__container">
          <Switch onChange={toggleTheme} defaultChecked={defaultDark} />
          <Button>Sauvegarder</Button>
          <Button reversed>Valider</Button>
          <Button reversed>Libérer</Button>
          <Button reversed>Annuler</Button>
        </div>
      </StickyNavbar>
      <div style={{ padding: "20px" }} className={"dnd__wide__container"}>
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
