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
import CheckBox from "../../materials/CheckBox/CheckBox";
import { useNavigate } from "react-router";
import Chart from "./Chart/Chart";
import { Chart2 } from "./Chart/Chart2";
import { Chart3 } from "./Chart/Chart3";
const Home = () => {
  const { user } = useContext(Context);
  const { data, refetch, loading } = useQuery(GET_ALL_CLIENTS, {
    variables: { userId: user?.id },
  });
  const [createClient] = useMutation(CREATE_CLIENT);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();
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
    <div className="home">
      <div className={"home__container"}>
        <div className={"home__clients__container"}>
          <h1 className={"home__clients__container__title"}>Clients</h1>
          <div className={"home__clients__container__spacer"} />
          <div className="home__clients__container__list">
            {data?.getAllClients?.length === 0 && (
              <h4 className={"home__clients__container__title"}>
                Aucun client.
              </h4>
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
            <div className="checkbox__container">
              <CheckBox checked={checked} setChecked={setChecked} />{" "}
              <span>Aller sur la page client après la création</span>
            </div>
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
      <div className={"chart__container"}>
        <div>
          <Chart />
        </div>
        <div>
          <Chart2 />
        </div>
        <div>
          <Chart3 />
        </div>
      </div>
    </div>
  );
};

export default Home;
