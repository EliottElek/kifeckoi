import React, { useContext } from "react";
import { Context } from "../Context/Context";
import "./Home.css";
import { useMutation, useQuery } from "@apollo/client";
import ClientItem from "./ClientItem";
import Button from "../../materials/Button/Button";
import InputText from "../../materials/InputText/InputText";
import { CREATE_CLIENT } from "../../graphql/mutations";
import { GET_ALL_CLIENTS } from "../../graphql/queries";
const Home = () => {
  const { clients, setClients, setOpenAlert, setAlertContent } =
    useContext(Context);
  const { data } = useQuery(GET_ALL_CLIENTS);
  const [createClient] = useMutation(CREATE_CLIENT);

  React.useEffect(() => {
    if (data) {
      setClients(data.getAllClients);
    }
  }, [setClients, data]);
  const [nameInput, setNameInput] = React.useState("");
  const [message, setMessage] = React.useState("");
  const submit = async (e) => {
    e.preventDefault();
    if (nameInput === "") {
      setMessage("Vous devez saisir un nom.");
      return null;
    }
    await createClient({
      variables: { name: nameInput },
    });
    setAlertContent({ content: "Client ajouté avec succès." });
    setOpenAlert(true);
    window.location.reload();
    setNameInput("");
  };
  return (
    <div className={"home__container"}>
      <div className={"home__project__container"}>
        <h1 className={"home__project__container__title"}>Clients</h1>
        <div className={"home__project__container__spacer"} />
        {clients.length === 0 && (
          <h4 className={"home__project__container__title"}>
            Aucun client.
          </h4>
        )}
        {clients.length !== 0 &&
          clients?.map((client, i) => <ClientItem key={i} client={client} />)}
      </div>
      <div className="home__new__project__container">
        <h1 className={"home__project__container__title"}>Nouveau client</h1>
        <div className={"home__project__container__spacer"} />
        <form onSubmit={submit} className={"home__new__client__form"}>
          <span>Nom du nouveau client</span>
          <span className={"home__project__container__empty__message"}>
            {message}
          </span>
          <InputText
            value={nameInput}
            style={{ marginTop: "10px", width: "90%" }}
            className="new_client_textarea"
            onChange={(e) => setNameInput(e.target.value)}
            placeholder={"Nom du nouveau client..."}
          />
          <Button onClick={submit} style={{ marginTop: "10px" }} type="submit">
            Créer le nouveau client
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
