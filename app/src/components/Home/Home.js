import React, { useContext } from "react";
import { Context } from "../Context/Context";
import "./Home.css";
import { useMutation, useQuery } from "@apollo/client";
import ClientItem from "./ClientItem";
import Button from "../../materials/Button/Button";
import { CREATE_CLIENT } from "../../graphql/mutations";
import { GET_ALL_CLIENTS } from "../../graphql/queries";
import AutoTextArea from "../../materials/AutoSizeTextArea/AutoSizeTextArea";
import Modal from "../../materials/Modal/Modal";
const Home = () => {
  const { clients, setClients } = useContext(Context);
  const { data, refetch } = useQuery(GET_ALL_CLIENTS);
  const [createClient] = useMutation(CREATE_CLIENT);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      setClients(data.getAllClients);
    }
  }, [setClients, data]);
  const [nameInput, setNameInput] = React.useState("");
  const title = document.getElementById("title");
  title.innerHTML = `Clients | Kifekoi`;
  const submit = async (e) => {
    if (nameInput === "") {
      return null;
    }
    try {
      await createClient({
        variables: { name: nameInput },
      });
    } catch (err) {
      console.log(err);
    }
    refetch();
    setNameInput("");
    setOpen(false);
  };
  return (
    <div className={"home__container"}>
      <div className={"home__project__container"}>
        <h1 className={"home__project__container__title"}>Clients</h1>
        <div className={"home__project__container__spacer"} />
        {clients.length === 0 && (
          <h4 className={"home__project__container__title"}>Aucun client.</h4>
        )}
        {clients.length !== 0 &&
          clients?.map((client, i) => <ClientItem key={i} client={client} />)}
      </div>
      <div className="home__new__project__container">
        <h1 className={"home__project__container__title"}>Nouveau client</h1>
        <div className={"home__project__container__spacer"} />
        <Button onClick={() => setOpen(true)} style={{ marginTop: "10px" }}>
          Créer un nouveau client +
        </Button>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className="modal__content__container">
          <AutoTextArea
            autoFocus
            className="modif__textarea medium__title__textarea"
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
