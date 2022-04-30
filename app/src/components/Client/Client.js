import React from "react";
import { Context } from "../Context/Context";
import { useParams } from "react-router";
import Progress from "../../materials/Progress/Progress";
import ProjectItem from "./ProjectItem";
import Button from "../../materials/Button/Button";
import {
  FIND_CLIENT_BY_ID,
  FIND_PROJECTS_BY_CLIENT_ID,
} from "../../graphql/queries";
import { CREATE_PROJECT } from "../../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Modal from "../../materials/Modal/Modal";
import AutoTextArea from "../../materials/AutoSizeTextArea/AutoSizeTextArea";
const Client = () => {
  const { currentClient, setCurrentClient, user } = React.useContext(Context);
  const [nameInput, setNameInput] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const { id } = useParams();
  const dataClient = useQuery(FIND_CLIENT_BY_ID, { variables: { id: id } });
  const { data } = useQuery(FIND_PROJECTS_BY_CLIENT_ID, {
    variables: { clientId: id, userId: user.id },
  });
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
  const submit = async () => {
    const idParams = id;
    if (nameInput === "") {
      return null;
    }
    const contributors = [user.id];
    await createProject({
      variables: {
        name: nameInput,
        clientId: idParams,
        contributors: contributors,
      },
    });
    dataClient.refetch();
    setNameInput("");
    setOpen(false);
  };
  if (!currentClient)
    return (
      <div className="progress__container">
        <Progress size="large" />
      </div>
    );
  return (
    <>
      <div className={"home__container"}>
        <div className={"home__project__container"}>
          <div className={"home__project__container__titlecontainer"}>
            <h1 className={"home__project__container__title"}>
              {currentClient.name}
            </h1>
          </div>
          <div className={"home__project__container__spacer"} />
          {data?.findProjectsByClientId?.length !== 0 &&
            data?.findProjectsByClientId?.map((project, i) => (
              <ProjectItem project={project} key={i} />
            ))}
          {data?.findProjectsByClientId?.length === 0 && (
            <h4 className={"home__project__container__title"}>
              Aucun projet pour ce client.
            </h4>
          )}
        </div>
        <div className="home__new__project__container">
          <h1 className={"home__project__container__title"}>Nouveau projet</h1>
          <div className={"home__project__container__spacer"} />
          <Button onClick={() => setOpen(true)} style={{ marginTop: "10px" }}>
            Créer un nouveau projet
          </Button>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className="modal__content__container">
          <AutoTextArea
            autoFocus
            className="modif__textarea medium__title__textarea"
            value={nameInput}
            placeholder={`Comment voulez-vous appeler le projet ?`}
            onChange={(e) => setNameInput(e.target.value)}
          />{" "}
          <div style={{ display: "flex", gap: "6px" }}>
            <Button
              style={{ height: "30px" }}
              reversed
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button style={{ height: "30px" }} onClick={submit}>
              Valider
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Client;
