import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import { useQuery } from "@apollo/client";
import { FIND_PROJECT_BY_PROJECT_ID } from "../../graphql/queries";
import { useNavigate, useParams } from "react-router";
import { IoIosAddCircle } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Progress from "../../materials/Progress/Progress";
import "./GlobalInfos.scss";
import UserCard from "./UserCard/UserCard";
import AddContributorsModal from "./AddContributorsModal";
import EventCard from "./EventCard/EventCard";
import Button from "../../materials/Button/Button";
import Popup from "../../materials/Popup/Popup";
import Menu from "../../materials/Menu/Menu";
import MenuItem from "../../materials/Menu/MenuItem";
const GlobalInfos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProject, setCurrentProject } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [openGlobalStatusPopup, setOpenGlobalStatusPopup] = useState(false);
  const [openPlanningStatusPopup, setOpenPlanningStatusPopup] = useState(false);
  const [openPerimeterStatusPopup, setOpenPerimeterStatusPopup] =
    useState(false);
  const [goCopyDate, setGoCopyDate] = useState(null);
  const [goLiveDate, setGoLiveDate] = useState(null);

  const [actions, setActions] = useState(null);
  const [infos, setInfos] = useState(null);
  const [risks, setRisks] = useState(null);
  const [decisions, setDecisions] = useState(null);
  const [problems, setProblems] = useState(null);

  const [globalStatus, setGlobalStatus] = useState("conforme");
  const [planningStatus, setPlanningStatus] = useState("conforme");
  const [perimeterStatus, setPerimeterStatus] = useState("conforme");

  const [deliverables, setDeliverables] = useState(null);
  const dataProject = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id },
  });
  React.useEffect(() => {
    if (dataProject?.data) {
      setCurrentProject({ ...dataProject?.data?.findProjectByProjectId });
    }
  }, [setCurrentProject, dataProject?.data]);
  React.useEffect(() => {
    const filteredArray = currentProject?.events?.filter(
      (event) => event.type === "Action"
    );
    setActions(filteredArray);
  }, [setActions, currentProject?.events]);
  React.useEffect(() => {
    const filteredArray = currentProject?.events?.filter(
      (event) => event.type === "Info"
    );
    setInfos(filteredArray);
  }, [setInfos, currentProject?.events]);
  React.useEffect(() => {
    const filteredArray = currentProject?.events?.filter(
      (event) => event.type === "Problems"
    );
    setProblems(filteredArray);
  }, [setProblems, currentProject?.events]);
  React.useEffect(() => {
    const filteredArray = currentProject?.events?.filter(
      (event) => event.type === "Risk"
    );
    setRisks(filteredArray);
  }, [setRisks, currentProject?.events]);
  React.useEffect(() => {
    const filteredArray = currentProject?.events?.filter(
      (event) => event.type === "Decision"
    );
    setDecisions(filteredArray);
  }, [setDecisions, currentProject?.events]);
  React.useEffect(() => {
    const filteredArray = currentProject?.events?.filter(
      (event) => event.type === "Deliverable"
    );
    setDeliverables(filteredArray);
  }, [setDeliverables, currentProject?.events]);

  const handleChangeGoLiveDate = (e) => {
    setGoLiveDate(e.target.value);
  };
  const handleChangeGoCopyDate = (e) => {
    setGoCopyDate(e.target.value);
  };
  if (!currentProject)
    return (
      <Backdrop>
        <Progress size="medium" reversed />
      </Backdrop>
    );
  return (
    <div className="global__infos__container">
      <div style={{ padding: "30px" }}>
        <h2 className="title__global__big">{currentProject?.name}</h2>
        <h4
          className={"client__link__big"}
          onClick={() => navigate(`/client/${currentProject?.client?.id}`)}
        >
          {currentProject?.client.name}
        </h4>
        <h4 className={"date__picker__container"}>
          {" "}
          Go live le
          <input
            type={"date"}
            value={goLiveDate}
            onChange={handleChangeGoLiveDate}
          />
        </h4>
        <h4 className={"date__picker__container"}>
          {" "}
          Go copy le{" "}
          <input
            type={"date"}
            value={goCopyDate}
            onChange={handleChangeGoCopyDate}
          />
        </h4>
        <h1
          style={{
            marginTop: "30px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Status global{" "}
          {globalStatus && (
            <span
              className={`status__span ${globalStatus.replace(
                / /g,
                "__"
              )}__span`}
              onClick={() => setOpenGlobalStatusPopup(true)}
            >
              {globalStatus} {<FaChevronDown />}
            </span>
          )}
          <Popup
            style={{ transform: "translate(200px, 100px)" }}
            bottom
            open={openGlobalStatusPopup}
            setOpen={setOpenGlobalStatusPopup}
          >
            <Menu>
              <MenuItem
                onClick={() => {
                  setGlobalStatus("conforme");
                  setOpenGlobalStatusPopup(false);
                }}
              >
                <span className={`status__conforme__span`}>conforme</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setGlobalStatus("vigilance");
                  setOpenGlobalStatusPopup(false);
                }}
              >
                <span className={`status__vigilance__span`}>vigilance</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setGlobalStatus("à risque");
                  setOpenGlobalStatusPopup(false);
                }}
              >
                <span className={`status__risque__span`}>à risque</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setGlobalStatus("alerte");
                  setOpenGlobalStatusPopup(false);
                }}
              >
                <span className={`status__alerte__span`}>alerte</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setGlobalStatus("issue");
                  setOpenGlobalStatusPopup(false);
                }}
              >
                <span className={`status__issue__span`}>issue</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setGlobalStatus("gestion de crise");
                  setOpenGlobalStatusPopup(false);
                }}
              >
                <span className={`status__gestion__de__crise__span`}>
                  gestion de crise
                </span>
              </MenuItem>
            </Menu>
          </Popup>
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat
          maximus ex ac tempus. Nam ac viverra ligula. Curabitur ornare in justo
          non consequat. Nunc egestas ante nisl, eu tincidunt nisi varius eu.
          Donec vel condimentum est. Ut sit amet purus metus. Ut a nunc velit.
          Mauris aliquam tortor nec eros sollicitudin, sed convallis metus
          suscipit. Etiam congue est iaculis ligula varius fermentum. Phasellus
          fringilla rutrum mauris vitae tempor. Aliquam porttitor est ac finibus
          convallis.
        </p>
        <h3
          style={{
            marginTop: "30px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          Status planning{" "}
          {planningStatus && (
            <span
              className={`status__span ${planningStatus.replace(
                / /g,
                "__"
              )}__span`}
              onClick={() => setOpenPlanningStatusPopup(true)}
            >
              {planningStatus} {<FaChevronDown />}
            </span>
          )}
          <Popup
            style={{ transform: "translate(145px, 100px)" }}
            bottom
            open={openPlanningStatusPopup}
            setOpen={setOpenPlanningStatusPopup}
          >
            <Menu>
              <MenuItem
                onClick={() => {
                  setPlanningStatus("conforme");
                  setOpenPlanningStatusPopup(false);
                }}
              >
                <span className={`status__conforme__span`}>conforme</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setPlanningStatus("vigilance");
                  setOpenPlanningStatusPopup(false);
                }}
              >
                <span className={`status__vigilance__span`}>vigilance</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setPlanningStatus("à risque");
                  setOpenPlanningStatusPopup(false);
                }}
              >
                <span className={`status__risque__span`}>à risque</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setPlanningStatus("alerte");
                  setOpenPlanningStatusPopup(false);
                }}
              >
                <span className={`status__alerte__span`}>alerte</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setPlanningStatus("issue");
                  setOpenPlanningStatusPopup(false);
                }}
              >
                <span className={`status__issue__span`}>issue</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setPlanningStatus("gestion de crise");
                  setOpenPlanningStatusPopup(false);
                }}
              >
                <span className={`status__gestion__de__crise__span`}>
                  gestion de crise
                </span>
              </MenuItem>
            </Menu>
          </Popup>{" "}
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat
          maximus ex ac tempus. Nam ac viverra ligula. Curabitur ornare in justo
          non consequat. Nunc egestas ante nisl, eu tincidunt nisi varius eu.
          Donec vel condimentum est.
        </p>
        <h3
          style={{
            marginTop: "30px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Status périmètre{" "}
          {perimeterStatus && (
            <span
              className={`status__span ${perimeterStatus.replace(
                / /g,
                "__"
              )}__span`}
              onClick={() => setOpenPerimeterStatusPopup(true)}
            >
              {perimeterStatus} {<FaChevronDown />}
            </span>
          )}
          <Popup
            style={{ transform: "translate(156px, 100px)" }}
            bottom
            open={openPerimeterStatusPopup}
            setOpen={setOpenPerimeterStatusPopup}
          >
            <Menu>
              <MenuItem
                onClick={() => {
                  setPerimeterStatus("conforme");
                  setOpenPerimeterStatusPopup(false);
                }}
              >
                <span className={`status__conforme__span`}>conforme</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setPerimeterStatus("vigilance");
                  setOpenPerimeterStatusPopup(false);
                }}
              >
                <span className={`status__vigilance__span`}>vigilance</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setPerimeterStatus("à risque");
                  setOpenPerimeterStatusPopup(false);
                }}
              >
                <span className={`status__risque__span`}>à risque</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setPerimeterStatus("alerte");
                  setOpenPerimeterStatusPopup(false);
                }}
              >
                <span className={`status__alerte__span`}>alerte</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setPerimeterStatus("issue");
                  setOpenPerimeterStatusPopup(false);
                }}
              >
                <span className={`status__issue__span`}>issue</span>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setPerimeterStatus("gestion de crise");
                  setOpenPerimeterStatusPopup(false);
                }}
              >
                <span className={`status__gestion__de__crise__span`}>
                  gestion de crise
                </span>
              </MenuItem>
            </Menu>
          </Popup>
        </h3>
        <p>
          Mauris aliquam tortor nec eros sollicitudin, sed convallis metus
          suscipit. Etiam congue est iaculis ligula varius fermentum. Phasellus
          fringilla rutrum mauris vitae tempor. Aliquam porttitor est ac finibus
          convallis.
        </p>
        <h3 style={{ marginTop: "30px" }}>
          {currentProject?.events.length} Évènement(s)
        </h3>
        <div className="event__cards__container">
          <EventCard
            type={actions?.length <= 1 ? "action" : "actions"}
            number={actions?.length}
            onClick={() => navigate(`/project/${currentProject?.id}/actions`)}
          />
          <EventCard
            type={infos?.length <= 1 ? "info" : "infos"}
            number={infos?.length}
            onClick={() => navigate(`/project/${currentProject?.id}/infos`)}
          />
          <EventCard
            type={decisions?.length <= 1 ? "décision" : "décisions"}
            number={decisions?.length}
            onClick={() => navigate(`/project/${currentProject?.id}/decisions`)}
          />
          <EventCard
            type={risks?.length <= 1 ? "risque" : "risques"}
            number={risks?.length}
            onClick={() => navigate(`/project/${currentProject?.id}/risks`)}
          />
          <EventCard
            type={problems?.length <= 1 ? "problème" : "problèmes"}
            number={problems?.length}
            onClick={() => navigate(`/project/${currentProject?.id}/problems`)}
          />
          <EventCard
            type={deliverables?.length <= 1 ? "livrable" : "livrables"}
            number={deliverables?.length}
            onClick={() =>
              navigate(`/project/${currentProject?.id}/deliverables`)
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "20px",
            gap: "12px",
          }}
        >
          <h2 className="title__global">
            Contributeurs ({currentProject?.contributors?.length}){" "}
          </h2>{" "}
          <Button
            onClick={() => setOpenModal(true)}
            style={{ height: "35px", gap: "8px" }}
          >
            Ajouter <IoIosAddCircle />
          </Button>
        </div>
        <div className={"user__cards__container"}>
          {currentProject?.contributors?.map((contributor, i) => (
            <UserCard dataProject={dataProject} usr={contributor} key={i} />
          ))}
        </div>
      </div>
      <AddContributorsModal
        dataProject={dataProject}
        alreadyExistingContributors={currentProject?.contributors}
        open={openModal}
        setOpen={setOpenModal}
      />
    </div>
  );
};

export default GlobalInfos;
