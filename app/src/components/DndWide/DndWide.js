import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/Context";
import ActionsDnd from "../Draggable/ActionsDnd";
import StickyNavbar from "../StickyNavbar/StickyNavbar";
import Button from "../../materials/Button/Button";
const DndWide = () => {
  const { currentProject } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentProject) {
      const title = document.getElementById("title");
      title.innerHTML = `${currentProject?.name}-Actions | Kifekoi`;
    }
  }, [currentProject?.name, currentProject]);
  return (
    <>
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
        </div>
      </StickyNavbar>
      <div style={{ padding: "20px" }}>
        <ActionsDnd />
      </div>
    </>
  );
};

export default DndWide;
