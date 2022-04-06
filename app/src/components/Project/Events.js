import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import EventsDnd from "../Draggable/EventKanban";
import { Context } from "../Context/Context";
import { BsArrowsFullscreen, BsListTask } from "react-icons/bs";
import { CgFormatUppercase } from "react-icons/cg";
import { useNavigate } from "react-router";
import ReactTooltip from "react-tooltip";
import TableEvents from "./TableEvents/TableEvents";
import "./Project.css";

const Events = ({ type }) => {
  const navigate = useNavigate();
  const { events, setEvents, listStyle, setListStyle, setMarkdown, markdown } =
    React.useContext(Context);
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    if (!listStyle) {
      var sum = 0;
      events?.forEach((event) => (sum = sum + event?.tasks?.length));
      setLength(sum);
    }
  }, [listStyle, events, setLength]);

  const Content = () => {
    if (listStyle) return <TableEvents type={type} />;
    return <EventsDnd type={type} setLength={setLength} length={length} />;
  };
  const Title = () => {
    return (
      <div className="title__container__acc">
        <p>
          {type}s ({length})
        </p>
        <button
          data-tip
          data-for="fullScreenTooltip"
          onClick={(e) => {
            e.stopPropagation();
            setEvents([]);
            navigate(type.toLowerCase() + "s");
          }}
          className="full__screen__button"
        >
          <BsArrowsFullscreen />
        </button>
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
        <ReactTooltip delayShow={500} id="fullScreenTooltip" effect="solid">
          <span>Grand écran</span>
        </ReactTooltip>
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
  return <Accordion id={type} content={Content()} title={Title()} />;
};

export default Events;
