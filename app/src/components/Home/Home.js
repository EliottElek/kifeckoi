import React, { useContext } from "react";
import { Context } from "../Context/Context";
import "./Home.scss";
import { useMutation, useQuery } from "@apollo/client";
import ClientItem from "./ClientItem";
import Button from "../../materials/Button/Button";
import { CREATE_CLIENT } from "../../graphql/mutations";
import { GET_ALL_CLIENTS } from "../../graphql/queries";
import { toast } from "react-toastify";
import Modal from "../../materials/Modal/Modal";
import Progress from "../../materials/Progress/Progress";
const Home = () => {
  const { user } = useContext(Context);
  const id = localStorage.getItem("userId");
  const { data, refetch, loading } = useQuery(GET_ALL_CLIENTS, {
    variables: { userId: id },
  });
  const [createClient] = useMutation(CREATE_CLIENT);
  const [open, setOpen] = React.useState(false);

  const [nameInput, setNameInput] = React.useState("");
  const title = document.getElementById("title");
  title.innerHTML = `Clients | Kifekoi`;
  const submit = async (e) => {
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
      await createClient({
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
      console.log(err);
    }
    setTimeout(() => {
      refetch();
    }, 200);
    setNameInput("");
    setOpen(false);
  };
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
    <div className={"home__container"}>
      <div className={"home__clients__container"}>
        <h1 className={"home__clients__container__title"}>Clients</h1>
        <div className={"home__clients__container__spacer"} />
        <div className="home__clients__container__list">
          {data?.getAllClients?.length === 0 && (
            <h4 className={"home__clients__container__title"}>Aucun client.</h4>
          )}
          {data?.getAllClients?.length !== 0 &&
            data?.getAllClients?.map((client, i) => (
              <ClientItem key={i} client={client} />
            ))}
        </div>
      </div>
      <div className="home__new__clients__container">
        <h1 className={"home__clients__container__title"}>Nouveau client</h1>
        <div className={"home__clients__container__spacer"} />
        <Button onClick={() => setOpen(true)} style={{ marginTop: "10px" }}>
          Créer un nouveau client +
        </Button>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className="modal__content__container">
          <input
            autoFocus
            className="name__input medium__title__textarea"
            value={nameInput}
            placeholder={`Comment s'appelle le client ?`}
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
    </div>
  );
};

export default Home;
