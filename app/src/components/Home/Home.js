import React, { useContext } from "react";
import { Context } from "../Context/Context";
import "./Home.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ClientItem from "./ClientItem";
import Button from "../../materials/Button/Button";
import InputText from "../../materials/InputText/InputText";
const Home = () => {
  const { clients, setClients, setOpenAlert, setAlertContent } =
    useContext(Context);
  const [nameInput, setNameInput] = React.useState("");
  const [message, setMessage] = React.useState("");
  const submit = async (e) => {
    e.preventDefault();
    if (nameInput === "") {
      setMessage("Vous devez indiquer un nom.");
      return null;
    }
    try {
      var client = [
        {
          id: uuidv4(),
          image:
            "https://assets.website-files.com/5ff319852fb4b1c3fc23719b/612b255af5fea663672f7489_logo%20Figma.png",
          property: "Client Name*",
          value: nameInput,
        },
      ];
      await axios.post("http://localhost:3001/clients/addnewclient", {
        client: client,
      });
      clients.push(client);
      setClients([...clients]);
      setNameInput("");
      setAlertContent({ content: "Client ajouté avec succès." });
    } catch (err) {
      setAlertContent({
        content: "Impossible d'ajouter un nouveau client.",
        type: "warning",
      });
    }
    setOpenAlert(true);
  };
  return (
    <div className={"home__container"}>
      <div className={"home__project__container"}>
        <h1 className={"home__project__container__title"}>Clients</h1>
        <div className={"home__project__container__spacer"} />
        {clients?.map((client, i) => (
          <ClientItem key={i} client={client} />
        ))}
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
