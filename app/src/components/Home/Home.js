import { useContext } from "react";
import { Context } from "../Context/Context";
import "./Home.scss";
import { useQuery } from "@apollo/client";
import { GET_ALL_CLIENTS } from "../../graphql/queries";
import Progress from "../../materials/Progress/Progress";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Cards from "./Cards/Cards";
import { Chart } from "./Chart/Chart";
const Home = () => {
  const { user } = useContext(Context);
  const { data, loading } = useQuery(GET_ALL_CLIENTS, {
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
      <div className="chart__container__dashboard">
        <Chart />
      </div>
    </div>
  );
};

export default Home;
