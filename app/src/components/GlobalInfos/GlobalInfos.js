import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_PROJECT_BY_PROJECT_ID } from "../../graphql/queries";
import { MODIFY_PROJECT_GLOBAL_INFOS } from "../../graphql/mutations";
import { Navigate, useNavigate, useParams } from "react-router";
import { IoIosAddCircle } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Progress from "../../materials/Progress/Progress";
import "./GlobalInfos.scss";
import UserCard from "./UserCard/UserCard";
import AddContributorsModal from "./AddContributorsModal";
import { FiMoreHorizontal } from "react-icons/fi";
import EventCard from "./EventCard/EventCard";
import Button from "../../materials/Button/Button";
import Popup from "../../materials/Popup/Popup";
import Menu from "../../materials/Menu/Menu";
import MenuItem from "../../materials/Menu/MenuItem";
import { toast } from "react-toastify";
import ModifTextArea from "./ModifTextArea/ModifTextArea";
import DatePicker from "./DatePicker/DatePicker";
import AddLogoModal from "./AddLogoModal/AddLogoModal";
import ChangeNameModal from "./ChangeNameModal/ChangeNameModal";
const status = [
  {
    name: "conforme",
    class: "conforme",
    icon: "",
  },
  {
    name: "vigilance",
    class: "vigilance",
    icon: "",
  },
  {
    name: "à risque",
    class: "à risque",
    icon: "",
  },
  {
    name: "alerte",
    class: "alerte",
    icon: "",
  },
  {
    name: "issue",
    class: "issue",
    icon: "",
  },
  {
    name: "gestion de crise",
    class: "gestion de crise",
    icon: "",
  },
];
const events = [
  {
    name: "Actions",
    url: "actions",
  },
  {
    name: "Infos",
    url: "infos",
  },
  {
    name: "Problèmes",
    url: "problems",
  },
  {
    name: "Risques",
    url: "risks",
  },
  {
    name: "Décisions",
    url: "decisions",
  },
  {
    name: "Livrables",
    url: "deliverables",
  },
];
const GlobalInfos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProject, setCurrentProject, setSelectedEvents, user } =
    useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [openLogoModal, setOpenLogoModal] = useState(false);
  const [openNameModal, setOpenNameModal] = useState(false);
  const [openTitleMenu, setOpenTitleMenu] = useState(false);
  const [openGlobalStatusPopup, setOpenGlobalStatusPopup] = useState(false);
  const [openPlanningStatusPopup, setOpenPlanningStatusPopup] = useState(false);
  const [openPerimeterStatusPopup, setOpenPerimeterStatusPopup] =
    useState(false);

  const [modifyProjectInfos] = useMutation(MODIFY_PROJECT_GLOBAL_INFOS);
  const dataProject = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id, userId: user?.id },
    onCompleted: (data) => {
      setCurrentProject(data?.findProjectByProjectId);
    },
  });

  const handleModifyGlobalStatus = async (item) => {
    try {
      setOpenGlobalStatusPopup(false);
      await modifyProjectInfos({
        variables: {
          projectId: currentProject.id,
          globalStatus: item.name,
          perimeterStatus: currentProject.perimeterStatus,
          planningStatus: currentProject.planningStatus,
          goLiveDate: currentProject.goLiveDate,
          goCopyDate: currentProject.goCopyDate,
          globalDescription: currentProject.globalDescription,
          perimeterDescription: currentProject.perimeterDescription,
          planningDescription: currentProject.planningDescription,
          logoUrl: currentProject.logoUrl,
        },
      });
      dataProject.refetch();
      toast.success(`État global passé à "${item.name}"`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    } catch (err) {
      toast.error("Impossible de changer l'état du status global.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  const handleModifyPerimeterStatus = async (item) => {
    try {
      setOpenPerimeterStatusPopup(false);
      await modifyProjectInfos({
        variables: {
          projectId: currentProject.id,
          globalStatus: currentProject.globalStatus,
          perimeterStatus: item.name,
          goLiveDate: currentProject.goLiveDate,
          goCopyDate: currentProject.goCopyDate,
          planningStatus: currentProject.planningStatus,
          globalDescription: currentProject.globalDescription,
          perimeterDescription: currentProject.perimeterDescription,
          planningDescription: currentProject.planningDescription,
          logoUrl: currentProject.logoUrl,
        },
      });
      dataProject.refetch();
      toast.success(`État périmètre passé à "${item.name}"`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    } catch (err) {
      toast.error("Impossible de changer l'état du status périmètre.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  const handleModifyPlanningStatus = async (item) => {
    try {
      setOpenPlanningStatusPopup(false);
      await modifyProjectInfos({
        variables: {
          projectId: currentProject.id,
          globalStatus: currentProject.globalStatus,
          perimeterStatus: currentProject.perimeterStatus,
          planningStatus: item.name,
          goLiveDate: currentProject.goLiveDate,
          goCopyDate: currentProject.goCopyDate,
          globalDescription: currentProject.globalDescription,
          perimeterDescription: currentProject.perimeterDescription,
          planningDescription: currentProject.planningDescription,
          logoUrl: currentProject.logoUrl,
        },
      });
      dataProject.refetch();
      toast.success(`État planning passé à "${item.name}"`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    } catch (err) {
      toast.error("Impossible de changer l'état du status planning.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  if (!dataProject.data && !dataProject.loading) {
    return <Navigate to="/404" />;
  }
  if (!currentProject)
    return (
      <Backdrop>
        <Progress size="medium" reversed />
      </Backdrop>
    );
  return (
    <div className="global__infos__container">
      <div style={{ margin: "30px" }}>
        <h2 className="title__global__big">
          {currentProject?.name}{" "}
          {currentProject.logoUrl !== "" && (
            <img
              alt=""
              className={"project__logo"}
              src={currentProject.logoUrl}
            />
          )}
          <div className={"title__buttons__container"} style={{ zIndex: 2 }}>
            <button
              className="title__modif__button"
              onClick={() => setOpenTitleMenu(true)}
            >
              <FiMoreHorizontal />
            </button>
            <Popup
              bottom
              open={openTitleMenu}
              setOpen={setOpenTitleMenu}
              style={{ transform: "translate(-5px,-20px)" }}
            >
              <Menu>
                <MenuItem
                  onClick={() => {
                    setOpenTitleMenu(false);
                    setOpenNameModal(true);
                  }}
                >
                  <span>Changer le nom</span>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setOpenTitleMenu(false);
                    setOpenLogoModal(true);
                  }}
                >
                  {currentProject.logoUrl === "" ? (
                    <span>Ajouter un logo</span>
                  ) : (
                    <span>Modifier le logo</span>
                  )}
                </MenuItem>
                <span className={"divider"} />
                <MenuItem
                  onClick={() => {
                    setOpenTitleMenu(false);
                  }}
                >
                  <span>Supprimer le projet</span>
                </MenuItem>
              </Menu>
            </Popup>
          </div>
        </h2>
        <h4
          className={"client__link__big"}
          onClick={() => navigate(`/client/${currentProject?.client?.id}`)}
        >
          {currentProject?.client.name}
        </h4>
        <DatePicker type={"Go live"} dataProject={dataProject} />
        <DatePicker type={"Go copy"} dataProject={dataProject} />
        <h1
          style={{
            marginTop: "30px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Status global{" "}
          <span
            className={`status__span ${
              currentProject.globalStatus
                ? currentProject.globalStatus.replace(/ /g, "__")
                : "conforme"
            }__span`}
            onClick={() => setOpenGlobalStatusPopup(true)}
          >
            {currentProject.globalStatus
              ? currentProject.globalStatus
              : "conforme"}{" "}
            {<FaChevronDown />}
          </span>
          <Popup
            style={{ transform: "translate(200px, 100px)" }}
            bottom
            open={openGlobalStatusPopup}
            setOpen={setOpenGlobalStatusPopup}
          >
            <Menu>
              {status.map((item, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    handleModifyGlobalStatus(item);
                  }}
                >
                  <span>
                    {item.name} {item.icon}
                  </span>
                </MenuItem>
              ))}
            </Menu>
          </Popup>
        </h1>
        <ModifTextArea type={"global"} dataProject={dataProject} />
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
          <span
            className={`status__span ${
              currentProject.planningStatus
                ? currentProject.planningStatus.replace(/ /g, "__")
                : "conforme"
            }__span`}
            onClick={() => setOpenPlanningStatusPopup(true)}
          >
            {currentProject.planningStatus
              ? currentProject.planningStatus
              : "conforme"}{" "}
            {<FaChevronDown />}
          </span>
          <Popup
            style={{ transform: "translate(145px, 100px)" }}
            bottom
            open={openPlanningStatusPopup}
            setOpen={setOpenPlanningStatusPopup}
          >
            <Menu>
              {status.map((item, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    handleModifyPlanningStatus(item);
                  }}
                >
                  <span>
                    {item.name} {item.icon}
                  </span>
                </MenuItem>
              ))}
            </Menu>
          </Popup>{" "}
        </h3>
        <ModifTextArea type={"planning"} dataProject={dataProject} />
        <h3
          style={{
            marginTop: "30px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Status périmètre{" "}
          <span
            className={`status__span ${
              currentProject.perimeterStatus
                ? currentProject.perimeterStatus.replace(/ /g, "__")
                : "conforme"
            }__span`}
            onClick={() => setOpenPerimeterStatusPopup(true)}
          >
            {currentProject.perimeterStatus
              ? currentProject.perimeterStatus
              : "conforme"}{" "}
            {<FaChevronDown />}
          </span>
          <Popup
            style={{ transform: "translate(156px, 100px)" }}
            bottom
            open={openPerimeterStatusPopup}
            setOpen={setOpenPerimeterStatusPopup}
          >
            <Menu>
              {status.map((item, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    handleModifyPerimeterStatus(item);
                  }}
                >
                  <span>
                    {item.name} {item.icon}
                  </span>
                </MenuItem>
              ))}
            </Menu>
          </Popup>
        </h3>
        <ModifTextArea type={"perimètre"} dataProject={dataProject} />
        <h3 style={{ marginTop: "30px" }}>Évènements</h3>
        <div className="event__cards__container">
          {events.map((event, i) => (
            <EventCard
              key={i}
              type={event.name}
              onClick={() => {
                setSelectedEvents([]);
                navigate(`/project/${currentProject?.id}/${event.url}`);
              }}
            />
          ))}
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
      <AddLogoModal
        open={openLogoModal}
        setOpen={setOpenLogoModal}
        dataProject={dataProject}
      />
      <ChangeNameModal
        open={openNameModal}
        setOpen={setOpenNameModal}
        dataProject={dataProject}
      />
    </div>
  );
};

export default GlobalInfos;
