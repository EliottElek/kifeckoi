import React, { useContext } from "react";
import { Context } from "../Context/Context";
import "./Home.css";
import { useMutation, useQuery } from "@apollo/client";
import ClientItem from "./ClientItem";
import Button from "../../materials/Button/Button";
import { CREATE_CLIENT } from "../../graphql/mutations";
import { GET_ALL_CLIENTS } from "../../graphql/queries";
const Home = () => {
  const { clients, setClients } = useContext(Context);
  const { data } = useQuery(GET_ALL_CLIENTS);
  const [createClient] = useMutation(CREATE_CLIENT);

  React.useEffect(() => {
    if (data) {
      setClients(data.getAllClients);
    }
  }, [setClients, data]);
  const [nameInput, setNameInput] = React.useState("");
  const title = document.getElementById("title");
  title.innerHTML = `Clients | Kifekoi`;
  const submit = async (e) => {
    e.preventDefault();
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
    window.location.reload();
    setNameInput("");
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
        <Button onClick={submit} style={{ marginTop: "10px" }} type="submit">
          Créer un nouveau client +
        </Button>
      </div>
    </div>
  );
};

export default Home;
