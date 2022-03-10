import React from "react";
import axios from "axios";
import rawActions from "../../rawActions";
import rawInfos from "../../rawInfos";

import gravatar from "gravatar";
export const Context = React.createContext();

const userData = {
  firstname: "Eliott",
  lastname: "Morcillo",
  admin: false,
  email: "eliott.morcillo@gmail.com",
  avatarUrl: gravatar.url(
    "eliott.morcillo@gmail.com",
    { s: "100", r: "x", d: "retro" },
    true
  ),
};

export const ContextProvider = ({ children }) => {
  const [clients, setClients] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [actions, setActions] = React.useState(rawActions);
  const [infos, setInfos] = React.useState(rawInfos);

  const [currentClient, setCurrentClient] = React.useState(null);
  const [currentProject, setCurrentProject] = React.useState(null);

  const [user, setUser] = React.useState(userData);

  function removeAllInstances(arr, item) {
    for (var i = arr.length; i--; ) {
      if (arr[i] === item) arr.splice(i, 1);
    }
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data: excel } = await axios.get(`http://localhost:3001/data`);
        removeAllInstances(excel, null);
        setClients(excel);
      } catch {
        alert("Une erreur est survenue lors de la récupération des données.");
      }
    };
    getData();
  }, []);
  return (
    <Context.Provider
      value={{
        user: user,
        setUser: setUser,
        clients: clients,
        setClients: setClients,
        projects: projects,
        setProjects: setProjects,
        actions: actions,
        setActions: setActions,
        infos: infos,
        setInfos: setInfos,
        currentClient: currentClient,
        setCurrentClient: setCurrentClient,
        currentProject: currentProject,
        setCurrentProject: setCurrentProject,
      }}
    >
      {children}
    </Context.Provider>
  );
};
