import React from "react";
import { Context } from "../Context/Context";
import { useParams } from "react-router";
import Progress from "../../materials/Progress/Progress";
import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router";
import InputText from "../../materials/InputText/InputText";
import Button from "../../materials/Button/Button";
import { FIND_CLIENT_BY_ID } from "../../graphql/queries";
import { CREATE_PROJECT } from "../../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import RecentsEvents from "./RecentEvents/RecentsEvents";

const Client = () => {
  const { currentClient, setCurrentClient, projects, setProjects } =
    React.useContext(Context);
  const navigate = useNavigate();
  const [nameInput, setNameInput] = React.useState("");
  const [message, setMessage] = React.useState("");

  const { id } = useParams();
  const dataClient = useQuery(FIND_CLIENT_BY_ID, { variables: { id: id } });

  const [createProject] = useMutation(CREATE_PROJECT);

  React.useEffect(() => {
    if (dataClient?.data) {
      setCurrentClient(dataClient?.data?.findClientById);
    }
  }, [setCurrentClient, dataClient?.data]);
  React.useEffect(() => {
    if (currentClient) {
      const title = document.getElementById("title");
      title.innerHTML = `${currentClient?.name} | Kifekoi`;
    }
  }, [currentClient?.name, currentClient]);
  React.useEffect(() => {
    if (currentClient) {
      setProjects(currentClient?.projects);
    }
  }, [setProjects, currentClient, dataClient?.projects]);
  const submit = async (e) => {
    const idParams = id;
    e.preventDefault();
    if (nameInput === "") {
      setMessage("Vous devez indiquer un nom.");
      return null;
    }
    await createProject({
      variables: { name: nameInput, clientId: idParams },
    });
    window.location.reload();
    setNameInput("");
  };
  if (!currentClient)
    return (
      <div className="progress__container">
        <Progress size="large" />
      </div>
    );
  if (!projects)
    return (
      <>
        <div className={"home__container"}>
          <div className={"home__project__container"}>
            <div className={"home__project__container__titlecontainer__button"}>
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
                {currentClient && currentClient.name}
              </h1>
            </div>
            <div className={"home__project__container__spacer"} />
            <Progress style={{ margin: "30px" }} size="large" />
          </div>
        </div>
      </>
    );
  return (
    <>
      <div className={"home__container"}>
        <div className={"home__project__container"}>
          <div className={"home__project__container__titlecontainer"}>
            <Button
              onClick={() => {
                navigate(`/`);
                setCurrentClient({});
                setProjects([]);
              }}
            >
              <i className="gg-chevron-left"></i>Retour
            </Button>
            <h1 className={"home__project__container__title"}>
              {currentClient.name}
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
            <Button
              onClick={submit}
              style={{ marginTop: "10px" }}
              type="submit"
            >
              Créer le nouveau projet
            </Button>
          </form>
        </div>
      </div>
      <RecentsEvents />
    </>
  );
};

export default Client;
