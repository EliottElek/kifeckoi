import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { Context } from "../Context/Context";
import Button from "../../materials/Button/Button";
import StickyNavbar from "../StickyNavbar/StickyNavbar";
import Progress from "../../materials/Progress/Progress";
import { FiEdit2 } from "react-icons/fi";
import { MdCheck } from "react-icons/md";
import { MdClear } from "react-icons/md";
import "./Project.css";
import Form from "./Form";
import Modal from "../../materials/Modal/Modal";
import { FIND_PROJECT_BY_PROJECT_ID } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
const Project = () => {
  const navigate = useNavigate();
  const {
    actions,
    currentProject,
    setCurrentProject,
    user,
    listStyle,
    setActions,
  } = useContext(Context);
  const [openSaveModal, setOpenSaveModal] = React.useState(false);
  const [modifMode, setModifMode] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const { id } = useParams();

  const dataProject = useQuery(FIND_PROJECT_BY_PROJECT_ID, {
    variables: { id: id },
  });
  React.useEffect(() => {
    if (dataProject?.data) {
      setCurrentProject({ ...dataProject?.data?.findProjectByProjectId });
    }
  }, [setCurrentProject, dataProject?.data]);
  React.useEffect(() => {
    if (currentProject) {
      const title = document.getElementById("title");
      title.innerHTML = `${currentProject?.name} | Kifekoi`;
    }
  }, [currentProject?.name, currentProject]);
  React.useEffect(() => {
    if (currentProject) {
      setTitle(currentProject?.name);
    }
  }, [currentProject?.name, setTitle, currentProject]);
  const clearActions = () => {
    if (!listStyle) actions?.forEach((action) => (action.tasks = []));
    else {
      setActions(null);
    }
  };
  const [saveButtonContent, setSaveButtonContent] =
    React.useState("Enregistrer");
  const save = () => {
    setSaveButtonContent(
      <>
        Enregistrement... <Progress reversed size={"small"} />
      </>
    );
    setTimeout(() => {
      setSaveButtonContent("Enregistré ! ✅");
    }, 2000);
    setTimeout(() => {
      setSaveButtonContent("Enregistrer");
    }, 3000);
  };

  return (
    <>
      {!currentProject ? (
        <div className="progress__container">
          <Progress size="large" />
        </div>
      ) : (
        <div>
          <StickyNavbar saveButtonContent={saveButtonContent}>
            <div className="name__container">
              <Button
                onClick={() => {
                  clearActions();
                  navigate(`/client/${currentProject.client.id}`);
                }}
              >
                <i className="gg-chevron-left"></i>Retour
              </Button>
              {user.admin ? (
                <>
                  {!modifMode ? (
                    <>
                      <h2 className="name__container__title">
                        {currentProject?.client?.name} - {currentProject?.name}
                      </h2>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModifMode(true);
                        }}
                        className="name__container__title__editbutton"
                      >
                        <FiEdit2 />
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="name__container__title">
                        {currentProject?.client?.name} -
                      </h2>
                      <input
                        className="name__container__input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModifMode(false);
                        }}
                        className="name__container__title__btn"
                      >
                        <MdCheck />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModifMode(false);
                        }}
                        className="name__container__title__btn"
                      >
                        <MdClear />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <h2 className="name__container__title">
                    {currentProject?.client?.name} - {currentProject?.name}
                  </h2>
                </>
              )}
            </div>
            <div className="actions__container">
              <Button onClick={save}>{saveButtonContent}</Button>
              <Button reversed onClick={() => setOpenSaveModal(true)}>
                Valider
              </Button>
              <Button reversed>Libérer</Button>
              <Button reversed>Annuler</Button>
            </div>
          </StickyNavbar>
          <Form
            openSaveModal={openSaveModal}
            setOpenSaveModal={setOpenSaveModal}
          />
          <Modal open={openSaveModal} setOpen={setOpenSaveModal}>
            <div className="modal__content__container">
              <h3>Êtes-vous sûr(e) de vouloir valider ?</h3>
              <p>Vous pourrez faire des modifications après enregistrement.</p>
              <div className="modal__content__actions__container">
                <Button reversed onClick={save}>
                  Valider
                </Button>
                <Button onClick={() => setOpenSaveModal(false)}>Annuler</Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Project;
