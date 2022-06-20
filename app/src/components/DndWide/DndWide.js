import { useContext, useEffect, lazy, Suspense } from "react";
import { Context } from "../Context/Context";
import "./DndWide.scss";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Progress from "../../materials/Progress/Progress";
import { Navigate, useParams } from "react-router";
const EventKanban = lazy(() => import("../Draggable/EventKanban"));
const renderLoader = () => (
  <Backdrop>
    <Progress size="medium" reversed />
  </Backdrop>
);
const DndWide = () => {
  const { currentProject } = useContext(Context);
  const { schema } = useParams();
  const type = currentProject?.eventsSchema.find(
    (e) => e.title.toLowerCase() === schema
  );

  useEffect(() => {
    if (currentProject) {
      const title = document.getElementById("title");
      title.innerHTML = `${currentProject?.name}-${type?.title} | Kifekoi`;
    }
  }, [currentProject?.name, currentProject, type?.title]);
  if (!type && currentProject) return <Navigate to="/404" />;
  return (
    <Suspense fallback={renderLoader()}>
      <EventKanban type={type?.title} />
    </Suspense>
  );
};

export default DndWide;
