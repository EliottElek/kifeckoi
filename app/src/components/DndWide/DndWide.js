import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/Context";
import ActionsDnd from "../Draggable/ActionsDnd";
import StickyNavbar from "../StickyNavbar/StickyNavbar";
import Button from "../../materials/Button/Button";
import TableEvents from "../Project/TableEvents/TableEvents";
import { BsListTask } from "react-icons/bs";

const DndWide = () => {
  const { currentProject, listStyle, setListStyle, setActions } =
    useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentProject) {
      const title = document.getElementById("title");
      title.innerHTML = `${currentProject?.name}-Actions | Kifekoi`;
    }
  }, [currentProject?.name, currentProject]);
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
            {currentProject?.name} - Actions
          </h2>
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
        </div>
      </StickyNavbar>
      <div
        style={{
          padding: "20px",
          overflowX: "auto",
          height: "100%",
        }}
      >
        {listStyle ? <TableEvents /> : <ActionsDnd />}
      </div>
    </div>
  );
};

export default DndWide;
