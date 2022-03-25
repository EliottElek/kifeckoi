import React from "react";
import Accordion from "../../materials/Accordion/Accordion";
import ActionsDnd from "../Draggable/ActionsDnd";
import { Context } from "../Context/Context";
import { BsArrowsFullscreen } from "react-icons/bs";
import { useNavigate } from "react-router";
import "./Project.css";

const ActionsV2 = () => {
  const navigate = useNavigate();
  const { actions } = React.useContext(Context);
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    var sum = 0;
    actions.forEach((action) => (sum = sum + action.tasks.length));
    setLength(sum);
  }, [actions, setLength]);

  const Content = () => {
    return <ActionsDnd setLength={setLength} length={length} />;
  };
  const Title = () => {
    return (
      <div className="title__container__acc">
        <p>Actions ({length})</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`actions`);
          }}
          className="full__screen__button"
        >
          <BsArrowsFullscreen />
        </button>
      </div>
    );
  };
  return <Accordion id={"actions"} content={Content()} title={Title()} />;
};

export default ActionsV2;
