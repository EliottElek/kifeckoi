import React from "react";
import { Context } from "../Context/Context";
import { useParams } from "react-router";
import Progress from "../../materials/Progress/Progress";
import ProjectItem from "./ProjectItem";
import Button from "../../materials/Button/Button";
import CheckBox from "../../materials/CheckBox/CheckBox";
import { useNavigate } from "react-router";
import "./Client.scss";
import {
  FIND_CLIENT_BY_ID,
  FIND_PROJECTS_BY_CLIENT_ID,
} from "../../graphql/queries";
import { CREATE_PROJECT } from "../../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Modal from "../../materials/Modal/Modal";
import { toast } from "react-toastify";
import { Navigate } from "react-router";

const Client = () => {
  const { currentClient, setCurrentClient, user } = React.useContext(Context);
  const [nameInput, setNameInput] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dataClient = useQuery(FIND_CLIENT_BY_ID, {
    variables: { id: id },
    onCompleted: (data) => {
      setCurrentClient(data?.findClientById);
    },
  });
  const { data, refetch, loading } = useQuery(FIND_PROJECTS_BY_CLIENT_ID, {
    variables: { clientId: id, userId: user?.id },
  });
  const [createProject] = useMutation(CREATE_PROJECT);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (currentClient) {
      const title = document.getElementById("title");
      title.innerHTML = `${currentClient?.name} | Kifekoi`;
    }
  }, [currentClient?.name, currentClient]);
  const submit = async (e) => {
    e.preventDefault();
    try {
      const idParams = id;
      if (nameInput === "") {
        return toast.warning(`Le projet doit avoir un nom.`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
      const contributors = [user.id];
      const resp = await createProject({
        variables: {
          name: nameInput,
          clientId: idParams,
          contributors: contributors,
        },
      });
      toast.success(`${nameInput} a été créé pour ${currentClient?.name}.`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      if (checked) {
        const newProjectId = resp.data.createProject.id;
        navigate(`/project/${newProjectId}`);
      }
    } catch (err) {
      toast.error(`Impossible de créer le projet.`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    setTimeout(() => {
      refetch();
    }, 200);
    setNameInput("");
    setOpen(false);
  };
  if (!dataClient.data && !dataClient.loading) {
    return <Navigate to="/404" />;
  }
  if (loading)
    return (
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Progress />
      </div>
    );
  return (
    <div className="client">
      <div className={"client__container"}>
        <div className={"client__projects__container"}>
          <h1 className={"client__projects__container__title"}>
            {currentClient?.name} - Projets
          </h1>
          <div className={"client__projects__container__spacer"} />
          <div className="client__projects__container__list">
            {data?.findProjectsByClientId?.length === 0 && (
              <h4 className={"client__projects__container__title"}>
                Aucun projet.
              </h4>
            )}
            {data?.findProjectsByClientId?.length !== 0 &&
              data?.findProjectsByClientId?.map((project, i) => (
                <ProjectItem key={i} project={project} />
              ))}
          </div>
        </div>
        <div className="client__new__clients__container">
          <h1 className={"client__projects__container__title"}>
            Nouveau projet
          </h1>
          <div className={"client__projects__container__spacer"} />
          <Button onClick={() => setOpen(true)} style={{ marginTop: "10px" }}>
            Créer un nouveau projet +
          </Button>
        </div>
        <Modal open={open} setOpen={setOpen} onSubmit={submit}>
          <form className="modal__content__container">
            <input
              autoFocus
              className="name__input medium__title__textarea"
              value={nameInput}
              placeholder={`Comment s'appelle le projet ?`}
              onChange={(e) => setNameInput(e.target.value)}
            />{" "}
            <div className="checkbox__container">
              <CheckBox checked={checked} setChecked={setChecked} />{" "}
              <span>Aller sur la page projet après la création</span>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <Button
                type={"button"}
                style={{ height: "30px" }}
                reversed
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
              <Button
                style={{ height: "30px" }}
                onClick={submit}
                type={"submit"}
              >
                Valider
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Client;
