import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { Context } from "../Context/Context";
import Button from "../../materials/Button/Button";
import StickyNavbar from "../StickyNavbar/StickyNavbar";
import Progress from "../../materials/Progress/Progress";
import "./Project.css";
import Form from "./Form";
import Modal from "../../materials/Modal/Modal";
import { v4 as uuidv4 } from "uuid";
import rawActions from "../../rawActions";
import rawInfos from "../../rawInfos";
import rawDecisions from "../../rawDecisions";
import rawRisks from "../../rawRisks";
import rawProblems from "../../rawProblems";

const Project = () => {
  const navigate = useNavigate();
  const {
    projects,
    setCurrentProject,
    actions,
    infos,
    decisions,
    setDecisions,
    setActions,
    risks,
    setRisks,
    problems,
    setProblems,
    currentProject,
    currentClient,
    setInfos,
  } = useContext(Context);
  const [openSaveModal, setOpenSaveModal] = React.useState(false);
  const { id } = useParams();

  const clearActions = () => {
    actions.forEach((action) => (action.tasks = []));
  };
  const clearInfos = () => {
    infos.forEach((info) => (info.tasks = []));
  };
  const clearDecisions = () => {
    decisions.forEach((decision) => (decision.tasks = []));
  };
  const clearRisks = () => {
    risks.forEach((risk) => (risk.tasks = []));
  };
  const clearProblems = () => {
    problems.forEach((prob) => (prob.tasks = []));
  };
  const [saveButtonContent, setSaveButtonContent] =
    React.useState("Enregistrer");

  React.useEffect(() => {
    const foundProject = projects.find((project) => project[0].id === id);
    setCurrentProject(foundProject);
    const actionsFinal = [...rawActions];
    const actionsData = currentProject?.filter(
      (item) =>
        item["Item Type   *"] === "2 - Action" ||
        item["Item Type  *"] === "2 - Action" ||
        item["Item Type *"] === "2 - Action" ||
        item["Item Type*"] === "2 - Action"
    );
    console.log(actionsData);
    actionsData?.forEach((action) => {
      const index = actionsFinal.findIndex(
        (ac) => ac.title === action["Status for the period *"]
      );
      if (index !== -1)
        actionsFinal[index].tasks.push({ ...action, id: uuidv4() });
    });
    setActions(actionsFinal);
    // eslint-disable-next-line
  }, [id, projects, setCurrentProject, setActions, currentProject]);
  React.useEffect(() => {
    const infosFinal = [...rawInfos];
    const infosData = currentProject?.filter(
      (item) =>
        item["Item Type   *"] === "3 - Info" ||
        item["Item Type  *"] === "3 - Info" ||
        item["Item Type *"] === "3 - Info" ||
        item["Item Type*"] === "3 - Info"
    );
    infosData?.forEach((info) => {
      const index = infosFinal.findIndex(
        (ac) => ac?.title === info["Status for the period *"]
      );
      if (index !== -1) infosFinal[index].tasks.push({ ...info, id: uuidv4() });
    });
    setInfos(infosFinal);
    // eslint-disable-next-line
  }, [id, projects, setCurrentProject, setInfos, currentProject]);
  React.useEffect(() => {
    const decisionsFinal = [...rawDecisions];
    const decisionsData = currentProject?.filter(
      (item) =>
        item["Item Type   *"] === "4 - Decision" ||
        item["Item Type  *"] === "4 - Decision" ||
        item["Item Type *"] === "4 - Decision" ||
        item["Item Type*"] === "4 - Decision"
    );
    console.log(decisionsData);
    decisionsData?.forEach((decision) => {
      const index = decisionsFinal.findIndex(
        (ac) => ac?.title === decision["Status for the period *"]
      );
      if (index !== -1)
        decisionsFinal[index].tasks.push({ ...decision, id: uuidv4() });
    });
    setDecisions(decisionsFinal);
    // eslint-disable-next-line
  }, [id, projects, setCurrentProject, setDecisions, currentProject]);
  React.useEffect(() => {
    const risksFinal = [...rawRisks];
    const risksData = currentProject?.filter(
      (item) =>
        item["Item Type   *"] === "5 - Risk" ||
        item["Item Type  *"] === "5 - Risk" ||
        item["Item Type *"] === "5 - Risk" ||
        item["Item Type*"] === "5 - Risk"
    );
    risksData?.forEach((risk) => {
      const index = risksFinal.findIndex(
        (ac) => ac?.title === risk["Status for the period *"]
      );
      if (index !== -1) risksFinal[index].tasks.push({ ...risk, id: uuidv4() });
    });
    setRisks(risksFinal);
    // eslint-disable-next-line
  }, [id, projects, setCurrentProject, setRisks, currentProject]);
  React.useEffect(() => {
    const problemsFinal = [...rawProblems];
    const problemsData = currentProject?.filter(
      (item) =>
        item["Item Type   *"] === "6 - Issue" ||
        item["Item Type  *"] === "6 - Issue" ||
        item["Item Type *"] === "6 - Issue" ||
        item["Item Type*"] === "6 - Issue"
    );
    problemsData?.forEach((decision) => {
      const index = problemsFinal.findIndex(
        (ac) => ac?.title === decision["Status for the period *"]
      );
      if (index !== -1)
        problemsFinal[index].tasks.push({ ...decision, id: uuidv4() });
    });
    setProblems(problemsFinal);
    // eslint-disable-next-line
  }, [id, projects, setCurrentProject, setRisks, currentProject]);
  console.log(currentProject);
  const save = () => {
    setSaveButtonContent(
      <>
        Enregistrement... <Progress size={"small"} />
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
                  clearInfos();
                  clearDecisions();
                  clearRisks();
                  clearProblems();
                  navigate(`/client/${currentClient[0]?.id}`);
                }}
              >
                <i className="gg-chevron-left"></i>Retour
              </Button>
              <h2 className="name__container__title">
                {" "}
                {currentProject[0]?.value}
              </h2>
            </div>
            <div className="actions__container">
              <Button reversed onClick={save}>
                {saveButtonContent}
              </Button>
              <Button onClick={() => setOpenSaveModal(true)}>Valider</Button>
              <Button>Libérer</Button>
              <Button>Annuler</Button>
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
