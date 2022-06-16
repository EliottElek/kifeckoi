import { useContext, useEffect, lazy, Suspense } from "react";
import { Context } from "../Context/Context";
import "./DndWide.scss";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Progress from "../../materials/Progress/Progress";
const EventKanban = lazy(() => import("../Draggable/EventKanban"));
const renderLoader = () => (
  <Backdrop>
    <Progress size="medium" reversed />
  </Backdrop>
);
const DndWide = ({ type }) => {
  const { currentProject } = useContext(Context);
  useEffect(() => {
    if (currentProject) {
      const title = document.getElementById("title");
      title.innerHTML = `${currentProject?.name}-${type}s | Kifekoi`;
    }
  }, [currentProject?.name, currentProject, type]);


  return (
    <Suspense fallback={renderLoader()}>
      <EventKanban type={type} />
    </Suspense>
  );
};

export default DndWide;
