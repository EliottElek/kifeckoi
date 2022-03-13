import React from "react";
import axios from "axios";
import { Context } from "../Context/Context";
import { useParams } from "react-router";
import Progress from "../../materials/Progress/Progress";
import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router";
import InputText from "../../materials/InputText/InputText";
import Button from "../../materials/Button/Button";

const Client = () => {
  const {
    currentClient,
    clients,
    setCurrentClient,
    projects,
    setProjects,
    setAlertContent,
    setOpenAlert,
  } = React.useContext(Context);
  const navigate = useNavigate();
  const [nameInput, setNameInput] = React.useState("");
  const [message, setMessage] = React.useState("");

  const { id } = useParams();
  React.useEffect(() => {
    if (clients.length) {
      setCurrentClient({ ...clients.find((client) => client[0].id === id) });
    }
  }, [id, clients, setCurrentClient]);
  React.useEffect(() => {
    const getProjects = async () => {
      try {
        const { data: projectsData } = await axios.get(
          `http://localhost:3001/clients/getbyid/${id}`
        );
        projectsData.shift();
        setProjects(projectsData);
      } catch {
        setAlertContent({
          content: "Impossible de charger les projets du client.",
          type: "warning",
        });
        setOpenAlert(true);
      }
    };
    getProjects();
  }, [setProjects, id, setAlertContent, setOpenAlert]);

  const submit = async (e) => {
    e.preventDefault();
    if (nameInput === "") {
      setMessage("Vous devez indiquer un nom.");
      return null;
    }
    try {
      var project = {
        "Chef de projet*": "",
        "Chef de projet Client *": "",
        "Client Name*": currentClient[0]?.value,
        "Project Name": nameInput,
        "Ref ERP": "",
        "Projectg phase": "",
        "Périod  *": "Y22W07",
        "Item Type  *": "",
        "Item description *": "",
        Comments: "",
        "Status for the period *": "",
        "Target Date": null,
        "Accountable (RACI)  *": null,
      };
      await axios.post(
        `http://localhost:3001/projects/addnewproject/${currentClient[0].id}`,
        {
          project: project,
        }
      );
      projects.push([project]);
      // setProjects([...projects]);
      window.location.reload();
      setNameInput("");
    } catch (err) {
      alert("Impossible d'enregistrer le projet.");
    }
  };
  if (!currentClient)
    return (
      <div className="progress__container">
        <Progress size="large" />
      </div>
    );
  if (!projects.length === 0)
    return (
      <div className={"home__container"}>
        <div className={"home__project__container"}>
          <div className={"home__project__container__titlecontainer"}>
            <button
              onClick={() => {
                navigate(`/`);
                setCurrentClient({});
                setProjects([]);
              }}
              className={"home__project__container__button"}
            >
              <i className="gg-chevron-left"></i>
            </button>
            <h1 className={"home__project__container__title"}>
              {currentClient && currentClient[0]?.value}
            </h1>
          </div>
          <div className={"home__project__container__spacer"} />
          <Progress style={{ margin: "30px" }} size="large" />
        </div>
      </div>
    );
  return (
    <div className={"home__container"}>
      <div className={"home__project__container"}>
        <div className={"home__project__container__titlecontainer"}>
          <button
            onClick={() => {
              navigate(`/`);
              setCurrentClient({});
              setProjects([]);
            }}
            className={"home__project__container__button"}
          >
            <i className="gg-chevron-left"></i>
          </button>
          <h1 className={"home__project__container__title"}>
            {currentClient[0]?.value}
          </h1>
        </div>
        <div className={"home__project__container__spacer"} />
        {projects.length !== 0 &&
          projects.map((project, i) => (
            <ProjectItem project={project} key={i} />
          ))}
        {projects.length === 0 && (
          <h4 className={"home__project__container__title"}>
            Aucun projet pour ce client.
          </h4>
        )}
      </div>
      <div className="home__new__project__container">
        <h1 className={"home__project__container__title"}>Nouveau projet</h1>
        <div className={"home__project__container__spacer"} />
        <form onSubmit={submit} className={"home__new__client__form"}>
          <span>Nom du nouveau projet</span>
          <span className={"home__project__container__empty__message"}>
            {message}
          </span>
          <InputText
            style={{ marginTop: "10px", width: "90%" }}
            className="new_client_textarea"
            onChange={(e) => setNameInput(e.target.value)}
            value={nameInput}
            placeholder={"Nom du nouveau projet..."}
          />
          <Button onClick={submit} style={{ marginTop: "10px" }} type="submit">
            Créer le nouveau projet
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Client;
