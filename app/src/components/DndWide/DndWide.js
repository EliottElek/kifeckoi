import { useContext, useEffect, lazy, Suspense } from "react";
import { Context } from "../Context/Context";
import "./DndWide.scss";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Progress from "../../materials/Progress/Progress";
import { Navigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { FIND_PROJECT_BY_PROJECT_ID } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
const EventKanban = lazy(() => import("../Draggable/EventKanban"));
const EventList = lazy(() => import("../EventList/EventTable"));

const renderLoader = () => (
  <Backdrop>
    <Progress size="medium" reversed />
  </Backdrop>
);
const DndWide = () => {
  const { currentProject, user, setCurrentProject, setDataProject } =
    useContext(Context);
  const { schema, id } = useParams();
  const dataProjectQuery = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id, userId: user?.id },
    onCompleted: (data) => {
      setCurrentProject(data?.findProjectByProjectId);
    },
  });

  const [searchParams] = useSearchParams();
  const display = searchParams.get("display");
  const type = currentProject?.eventsSchema.find(
    (e) => e.title.toLowerCase() === schema
  );
  useEffect(() => {
    if (dataProjectQuery) setDataProject(dataProjectQuery);
  }, [dataProjectQuery, setDataProject]);
  useEffect(() => {
    if (currentProject) {
      const title = document.getElementById("title");
      title.innerHTML = `${currentProject?.name}-${type?.title} | Kifekoi`;
    }
  }, [currentProject?.name, currentProject, type?.title]);
  if (!type && currentProject) return <Navigate to="/404" />;
  if (display === "list" && type)
    return (
      <div
        style={{
          height: "100%",
        }}
        id="custom__bg"
      >
        <Suspense fallback={renderLoader()}>
          <EventList type={type?.title} />
        </Suspense>
      </div>
    );
  return (
    <div
      style={{
        backgroundSize: "cover",
        height: "100%",
        background: type?.backgroundUrl,
      }}
      id="custom__bg"
    >
      <Suspense fallback={renderLoader()}>
        <EventKanban type={type?.title} />
      </Suspense>
    </div>
  );
};

export default DndWide;
