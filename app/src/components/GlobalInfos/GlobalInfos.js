import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import { useMutation, useQuery } from "@apollo/client";
import {
  FIND_PROJECT_BY_PROJECT_ID,
  //GET_ALL_EVENTS_ALL_TYPES,
} from "../../graphql/queries";
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
import Button from "../../materials/Button/Button";
import { Menu, MenuItem } from "@mui/material";
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
const GlobalInfos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProject, setCurrentProject, user } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [openLogoModal, setOpenLogoModal] = useState(false);
  // const [events, setEvents] = useState([]);

  const [openNameModal, setOpenNameModal] = useState(false);

  const [modifyProjectInfos] = useMutation(MODIFY_PROJECT_GLOBAL_INFOS);
  const dataProject = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id, userId: user?.id },
    onCompleted: (data) => {
      setCurrentProject(data?.findProjectByProjectId);
    },
  });
  const [anchorElName, setAnchorElName] = React.useState(null);
  const [anchorElGlobal, setAnchorElGlobal] = React.useState(null);
  const [anchorElPlanning, setAnchorElPlanning] = React.useState(null);
  const [anchorElPerimeter, setAnchorElPerimeter] = React.useState(null);

  const openPopUpName = Boolean(anchorElName);
  const openPopUpGlobal = Boolean(anchorElGlobal);
  const openPopUpPlanning = Boolean(anchorElPlanning);
  const openPopUpPerimeter = Boolean(anchorElPerimeter);

  const handleClickName = (event) => {
    setAnchorElName(event.currentTarget);
  };
  const handleClickGlobal = (event) => {
    setAnchorElGlobal(event.currentTarget);
  };
  const handleClickPlanning = (event) => {
    setAnchorElPlanning(event.currentTarget);
  };
  const handleClickPerimeter = (event) => {
    setAnchorElPerimeter(event.currentTarget);
  };
  const handleCloseName = () => {
    setAnchorElName(null);
  };
  const handleCloseGlobal = () => {
    setAnchorElGlobal(null);
  };
  const handleClosePlanning = () => {
    setAnchorElPlanning(null);
  };
  const handleClosePerimeter = () => {
    setAnchorElPerimeter(null);
  };
  // const eventsData = useQuery(GET_ALL_EVENTS_ALL_TYPES, {
  //   variables: { id: id },
  //   onCompleted: (data) => {
  //     setEvents(data?.getAllEventsAllTypes);
  //   },
  // });
  // React.useEffect(() => {
  //   eventsData.refetch();
  // });
  const handleModifyGlobalStatus = async (item) => {
    try {
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
            <button className="title__modif__button" onClick={handleClickName}>
              <FiMoreHorizontal />
            </button>
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
            flex: "none",
          }}
        >
          Status global{" "}
          <span
            className={`status__span ${
              currentProject.globalStatus
                ? currentProject.globalStatus.replace(/ /g, "__")
                : "conforme"
            }__span`}
            onClick={handleClickGlobal}
          >
            {currentProject.globalStatus
              ? currentProject.globalStatus
              : "conforme"}{" "}
            {<FaChevronDown />}
          </span>
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
            onClick={handleClickPlanning}
          >
            {currentProject.planningStatus
              ? currentProject.planningStatus
              : "conforme"}{" "}
            {<FaChevronDown />}
          </span>
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
            onClick={handleClickPerimeter}
          >
            {currentProject.perimeterStatus
              ? currentProject.perimeterStatus
              : "conforme"}{" "}
            {<FaChevronDown />}
          </span>
        </h3>
        <ModifTextArea type={"perimètre"} dataProject={dataProject} />
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
      <Menu
        anchorEl={anchorElName}
        open={openPopUpName}
        onClose={handleCloseName}
        sx={{
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setOpenNameModal(true);
            handleCloseName();
          }}
        >
          <span>Changer le nom</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenLogoModal(true);
            handleCloseName();
          }}
        >
          {currentProject.logoUrl === "" ? (
            <span>Ajouter un logo</span>
          ) : (
            <span>Modifier le logo</span>
          )}
        </MenuItem>
        <span className={"divider"} />
        <MenuItem onClick={handleCloseName}>
          <span>Supprimer le projet</span>
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorElGlobal}
        open={openPopUpGlobal}
        onClose={handleCloseGlobal}
        sx={{
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        {" "}
        {status.map((item, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              handleModifyGlobalStatus(item);
              handleCloseGlobal();
            }}
          >
            <span>
              {item.name} {item.icon}
            </span>
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={anchorElPlanning}
        open={openPopUpPlanning}
        onClose={handleClosePlanning}
        sx={{
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        {" "}
        {status.map((item, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              handleModifyPlanningStatus(item);
              handleClosePlanning();
            }}
          >
            <span>
              {item.name} {item.icon}
            </span>
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={anchorElPerimeter}
        open={openPopUpPerimeter}
        onClose={handleClosePerimeter}
        sx={{
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        {status.map((item, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              handleModifyPerimeterStatus(item);
              handleClosePerimeter();
            }}
          >
            <span>
              {item.name} {item.icon}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default GlobalInfos;
