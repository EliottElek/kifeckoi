import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_PROJECT_BY_PROJECT_ID } from "../../graphql/queries";
import { MODIFY_PROJECT_GLOBAL_INFOS } from "../../graphql/mutations";
import { Navigate, useNavigate, useParams } from "react-router";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Progress from "../../materials/Progress/Progress";
import "./GlobalInfos.scss";
import Modal from "../../materials/Modal/Modal";
import UserCard from "./UserCard/UserCard";
import AddContributorsModal from "./AddContributorsModal";
import { FiMoreHorizontal } from "react-icons/fi";
import Button from "../../materials/Button/Button";
import { CircularProgress, Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import ModifTextArea from "./ModifTextArea/ModifTextArea";
import DatePicker from "./DatePicker/DatePicker";
import AddLogoModal from "./AddLogoModal/AddLogoModal";
import ChangeNameModal from "./ChangeNameModal/ChangeNameModal";
import formatDate from "../../assets/functions/formatDate";
import DropFileInput from "../DragDropFile/DragDropFile";
import axios from "axios";
import getBase64 from "../../assets/functions/base64";
import { BiImport } from "react-icons/bi";
import { MdOutlineClear } from "react-icons/md";
import Cards from "./EventCards/Cards";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
  const {
    currentProject,
    setCurrentProject,
    user,
    setDataProject,
    dataProject,
  } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openLogoModal, setOpenLogoModal] = useState(false);
  const [openNameModal, setOpenNameModal] = useState(false);
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [modifyProjectInfos] = useMutation(MODIFY_PROJECT_GLOBAL_INFOS);
  const dataProjectQuery = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id, userId: user?.id },
    onCompleted: (data) => {
      setCurrentProject(data?.findProjectByProjectId);
    },
  });

  React.useEffect(() => {
    if (dataProjectQuery) setDataProject(dataProjectQuery);
  }, [dataProjectQuery, setDataProject]);
  const [anchorElName, setAnchorElName] = React.useState(null);
  const [anchorElGlobal, setAnchorElGlobal] = React.useState(null);
  const [anchorElPlanning, setAnchorElPlanning] = React.useState(null);
  const [anchorElPerimeter, setAnchorElPerimeter] = React.useState(null);
  const [uploadResponse, setUploadResponse] = React.useState(null);
  const [openRspModal, setOpenRspModal] = React.useState(false);

  const [files, setFiles] = React.useState([]);
  const openPopUpName = Boolean(anchorElName);
  const openPopUpGlobal = Boolean(anchorElGlobal);
  const openPopUpPlanning = Boolean(anchorElPlanning);
  const openPopUpPerimeter = Boolean(anchorElPerimeter);

  const onFileChange = (files) => {
    setFiles(files);
  };
  const onFileSubmit = async () => {
    try {
      setUploadLoading(true);
      getBase64(files[0])
        .then(async (result) => {
          const { data: resp } = await axios.post(
            `https://kifekoi-api.herokuapp.com/import/${currentProject.id}`,
            result
          );
          if (resp.error)
            return toast.error(resp.message, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            });
          else if (resp.length === 0)
            setUploadResponse({
              success: true,
              message: "Les évènements ont bien été importés.",
            });
          else
            setUploadResponse({
              success: false,
              failed: resp,
            });
          setUploadLoading(false);
          setOpenRspModal(true);
        })
        .catch((e) => {
        })
        .finally(() => {
          setUploadLoading(false);
        });
    } catch (err) {
      toast.error(`Impossible d'uploader le fichier.`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      setUploadLoading(false);
    }
  };
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
  if (!dataProject && !dataProjectQuery.loading) {
    return <Navigate to="/404" />;
  }
  if (!currentProject)
    return (
      <Backdrop>
        <Progress size="medium" reversed />
      </Backdrop>
    );
  return (
    <>
      {uploadLoading ? (
        <Backdrop>
          <Progress size="medium" reversed />
        </Backdrop>
      ) : (
        <div className="global__infos__container">
          <div style={{ margin: "30px", overflowX: "hidden" }}>
            <div className="level__two__header">
              <h2 className="title__global__big">
                {currentProject?.name}{" "}
                {currentProject.logoUrl !== "" && (
                  <img
                    alt=""
                    className={"project__logo"}
                    src={currentProject.logoUrl}
                  />
                )}
                <div className={"title__buttons__container"}>
                  <button
                    className="title__modif__button"
                    onClick={handleClickName}
                  >
                    <FiMoreHorizontal />
                  </button>
                </div>
              </h2>
              <Button
                onClick={() => setOpenUploadModal(true)}
                style={{ gap: "8px" }}
              >
                Importer <BiImport fontSize="1.2rem" />
              </Button>
            </div>
            {currentProject?.creator && (
              <span className={"date__creator__span"}>
                Créé par {currentProject.creator.firstname} (
                {currentProject.creator.email}) le{" "}
                {formatDate(currentProject?.creation, true)}
              </span>
            )}
            <h4
              className={"client__link__big"}
              onClick={() => navigate(`/client/${currentProject?.client?.id}`)}
            >
              {currentProject?.client.name}
            </h4>
            <DatePicker type={"Go live"} dataProject={dataProject} />
            <DatePicker type={"Go copy"} dataProject={dataProject} />
            <Cards />
            <h1
              style={{
                marginTop: "30px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "2px",
                flexGrow: 1,
                justifyContent: "space-between",
                maxWidth: "400px",
              }}
            >
              Status global{" "}
              <Button
                onClick={handleClickGlobal}
                className={`status__span ${
                  currentProject.globalStatus
                    ? currentProject.globalStatus.replace(/ /g, "__")
                    : "conforme"
                }__span`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  justifyContent: "space-between",
                  padding: "4px 8px",
                  color: "white",
                }}
              >
                {currentProject.globalStatus
                  ? currentProject.globalStatus
                  : "conforme"}
                {!dataProject.loading || !modifyProjectInfos.loading ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <CircularProgress style={{ color: "white" }} size={20} />
                )}
              </Button>
            </h1>
            <ModifTextArea type={"global"} dataProject={dataProject} />
            <h1
              style={{
                marginTop: "30px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "2px",
                flexGrow: 1,
                justifyContent: "space-between",
                maxWidth: "400px",
              }}
            >
              Status planning{" "}
              <Button
                onClick={handleClickPlanning}
                className={`status__span ${
                  currentProject.planningStatus
                    ? currentProject.planningStatus.replace(/ /g, "__")
                    : "conforme"
                }__span`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  justifyContent: "space-between",
                  padding: "4px 8px",
                  color: "white",
                }}
              >
                {currentProject.planningStatus
                  ? currentProject.planningStatus
                  : "conforme"}
                {!dataProject.loading || !modifyProjectInfos.loading ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <CircularProgress style={{ color: "white" }} size={20} />
                )}
              </Button>
            </h1>
            <ModifTextArea type={"planning"} dataProject={dataProject} />
            <h1
              style={{
                marginTop: "30px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "2px",
                flexGrow: 1,
                justifyContent: "space-between",
                maxWidth: "400px",
              }}
            >
              Status périmètre{" "}
              <Button
                onClick={handleClickPerimeter}
                className={`status__span ${
                  currentProject.perimeterStatus
                    ? currentProject.perimeterStatus.replace(/ /g, "__")
                    : "conforme"
                }__span`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  justifyContent: "space-between",
                  padding: "4px 8px",
                  color: "white",
                }}
              >
                {currentProject.perimeterStatus
                  ? currentProject.perimeterStatus
                  : "conforme"}
                {!dataProject.loading || !modifyProjectInfos.loading ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <CircularProgress style={{ color: "white" }} size={20} />
                )}
              </Button>
            </h1>
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
                Ajouter
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
          <Modal open={openUploadModal} setOpen={setOpenUploadModal}>
            <DropFileInput
              onFileChange={onFileChange}
              onFileSubmit={onFileSubmit}
              setOpenModal={setOpenUploadModal}
              header={
                <>
                  <h3>Fichiers autorisés : .csv</h3>
                  <p>
                    Importez des évènements : actions, informations,
                    problèmes...
                  </p>
                </>
              }
            />
            <button
              data-tip
              onClick={(e) => {
                e.stopPropagation();
                setOpenUploadModal(false);
              }}
              className="close__modal__button"
            >
              <MdOutlineClear />
            </button>
          </Modal>
          <Modal open={openRspModal} setOpen={setOpenRspModal}>
            <div className="modal__content__container" style={{ width: "95%" }}>
              {uploadResponse?.success === true ? (
                <h2>Tous les évènements ont été uploadés avec succès.</h2>
              ) : (
                <div>
                  Les évènements suivants n'ont pas pu être uploadés :
                  <ul>
                    {uploadResponse?.failed?.map((fail) => (
                      <li>{fail.id}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default GlobalInfos;
