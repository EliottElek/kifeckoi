import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import ActionsDnd from "../Draggable/ActionsDnd";
import { Context } from "../Context/Context";
import { BsArrowsFullscreen, BsListTask } from "react-icons/bs";
import { useNavigate } from "react-router";
import ReactTooltip from "react-tooltip";
import TableEvents from "../Project/TableEvents/TableEvents";
import "./Project.css";

const ActionsV2 = () => {
  const navigate = useNavigate();
  const { actions, setActions, listStyle, setListStyle } =
    React.useContext(Context);
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    if (!listStyle) {
      var sum = 0;
      actions?.forEach((action) => (sum = sum + action?.tasks?.length));
      setLength(sum);
    }
  }, [listStyle, actions, setLength]);

  const Content = () => {
    if (listStyle) return <TableEvents />;
    return <ActionsDnd setLength={setLength} length={length} />;
  };
  const Title = () => {
    return (
      <div className="title__container__acc">
        <p>Actions ({length})</p>
        <button
          data-tip
          data-for="fullScreenTooltip"
          onClick={(e) => {
            e.stopPropagation();
            setActions([]);
            navigate(`actions`);
          }}
          className="full__screen__button"
        >
          <BsArrowsFullscreen />
        </button>
        <button
          data-tip
          onClick={(e) => {
            e.stopPropagation();
            setActions(null);
            setListStyle(!listStyle);
          }}
          data-for="ListTooltip"
          className={`list__style__button ${
            listStyle && " active__list__style"
          }`}
        >
          <BsListTask />
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
      </div>
    );
  };
  return <Accordion id={"actions"} content={Content()} title={Title()} />;
};

export default ActionsV2;
