import { useContext } from "react";
import { Context } from "../Context/Context";
import "./Home.scss";
import { useGetAllClients } from "../../hooks/queries/client";
import Progress from "../../materials/Progress/Progress";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Cards from "../Cards/Cards";
import { Chart } from "./Chart/Chart";
import LatestEvents from "./LatestEvents/LatestEvents";
import LatestNotifications from "./LatestNotifications/LatestNotifications";
const Home = () => {
  const { user } = useContext(Context);
  const { data, loading } = useGetAllClients({
    variables: { userId: user?.id },
  });
  const title = document.getElementById("title");
  title.innerHTML = `Dashboard | Kifekoi`;

  if (loading || !data)
    return (
      <Backdrop>
        <Progress size="medium" />
      </Backdrop>
    );
  return (
    <div className="home">
      <div className="level__two__header">
        <h1 className={"client__projects__container__title"}>
          Tableau de bord
        </h1>
      </div>
      <Cards clients={data?.getAllClients} />
      <Chart />
      <div className="two__items__grid">
        <LatestEvents />
        <LatestNotifications />
      </div>
    </div>
  );
};

export default Home;
