import React, { useContext } from "react";
import { Context } from "../Context/Context";
import "./Clients.scss";
import { useMutation, useQuery } from "@apollo/client";
import ClientItem from "./ClientItem";
import Button from "../../materials/Button/Button";
import { CREATE_CLIENT } from "../../graphql/mutations";
import { GET_ALL_CLIENTS } from "../../graphql/queries";
import { toast } from "react-toastify";
import Modal from "../../materials/Modal/Modal";
import Progress from "../../materials/Progress/Progress";
import CheckBox from "../../materials/CheckBox/CheckBox";
import { useNavigate } from "react-router";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Grid from "../Grid/Grid";
const Clients = () => {
  const { user } = useContext(Context);
  const { data, refetch, loading } = useQuery(GET_ALL_CLIENTS, {
    variables: { userId: user?.id },
  });
  const [createClient] = useMutation(CREATE_CLIENT);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const navigate = useNavigate();
  const [nameInput, setNameInput] = React.useState("");
  const title = document.getElementById("title");
  title.innerHTML = `Clients | Kifekoi`;
  const submit = async (e) => {
    e.preventDefault();
    if (nameInput === "") {
      return toast.warning(`Le client doit avoir un nom.`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    try {
      const resp = await createClient({
        variables: { name: nameInput, userId: user.id },
      });
      toast.success(`${nameInput} créé avec succès.`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      refetch();
      if (checked) {
        const newProjectId = resp.data.createClient.id;
        navigate(`/client/${newProjectId}`);
      }
    } catch (err) {
      toast.error(`Impossible de créer le client.`, {
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
  if (loading || !data)
    return (
      <Backdrop>
        <Progress size="medium" />
      </Backdrop>
    );
  return (
    <div className="home">
      <div className="level__two__header">
        <h1 className={"client__projects__container__title"}>Clients</h1>
        <Button onClick={() => setOpen(true)} style={{ marginTop: "10px" }}>
          Créer un nouveau client
        </Button>
      </div>
      <Grid>
        {data?.getAllClients?.length === 0 && (
          <h4 className={"home__clients__container__title"}>Aucun client.</h4>
        )}
        {data?.getAllClients?.length !== 0 &&
          data?.getAllClients?.map((client, i) => (
            <ClientItem key={i} client={client} />
          ))}
      </Grid>
      <Modal
        open={open}
        setOpen={setOpen}
        onClose={() => setOpen(false)}
        onSubmit={submit}
      >
        <form className="modal__add" onSubmit={submit}>
          <input
            autoFocus
            className="name__input"
            value={nameInput}
            placeholder={`Comment s'appelle le client ?`}
            onChange={(e) => setNameInput(e.target.value)}
          />{" "}
          <div className="checkbox__container">
            <CheckBox checked={checked} setChecked={setChecked} />{" "}
            <span>Aller sur la page client après la création</span>
          </div>
          <div className="add__modal__actions">
            <Button
              style={{ height: "30px" }}
              reversed
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button style={{ height: "30px" }} onClick={submit} type="submit">
              Valider
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Clients;
