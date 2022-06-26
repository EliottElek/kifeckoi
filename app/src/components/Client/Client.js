import React from "react";
import { Context } from "../Context/Context";
import { useParams } from "react-router";
import Progress from "../../materials/Progress/Progress";
import Button from "../../materials/Button/Button";
import CheckBox from "../../materials/CheckBox/CheckBox";
import { useNavigate } from "react-router";
import Backdrop from "../../materials/Backdrop/Backdrop";
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
import Grid from "../Grid/Grid";
import ProjectItem from "./ProjectItem";
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
  const [checked, setChecked] = React.useState(true);

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
  if (loading || !dataClient)
    return (
      <Backdrop>
        <Progress size="medium" />
      </Backdrop>
    );
  return (
    <div className="client">
      <div className="level__two__header">
        <h1 className={"client__projects__container__title"}>
          {currentClient?.name} - Projets
        </h1>
        <Button onClick={() => setOpen(true)} style={{ marginTop: "10px" }}>
          Créer un nouveau projet
        </Button>
      </div>
      <Grid>
        {data?.findProjectsByClientId?.length === 0 && (
          <h4 className={"client__projects__container__title"}>
            Aucun projet.
          </h4>
        )}
        {data?.findProjectsByClientId?.length !== 0 &&
          data?.findProjectsByClientId?.map((project, i) => (
            <ProjectItem key={i} project={project} />
          ))}
      </Grid>

      <Modal
        open={open}
        setOpen={setOpen}
        onSubmit={submit}
        onClose={() => setOpen(false)}
      >
        <form className="modal__add">
          <input
            autoFocus
            className="name__input"
            value={nameInput}
            placeholder={`Comment s'appelle le projet ?`}
            onChange={(e) => setNameInput(e.target.value)}
          />{" "}
          <div className="checkbox__container">
            <CheckBox checked={checked} setChecked={setChecked} />{" "}
            <span>Aller sur la page projet après la création</span>
          </div>
          <div className="add__modal__actions">
            <Button
              type={"button"}
              style={{ height: "30px" }}
              reversed
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button style={{ height: "30px" }} onClick={submit} type={"submit"}>
              Valider
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Client;
