import React from "react";
import rawActions from "../../rawActions";
import rawInfos from "../../rawInfos";
import rawDecisions from "../../rawDecisions";
import rawRisks from "../../rawRisks";
import rawProblems from "../../rawProblems";
import gravatar from "gravatar";


export const Context = React.createContext();

const userData = {
  firstname: "Eliott",
  lastname: "Morcillo",
  admin: true,
  email: "eliott.morcillo@gmail.com",
  avatarUrl: gravatar.url(
    "eliott.morcillo@gmail.com",
    { s: "100", r: "x", d: "retro" },
    true
  ),
};
export const ContextProvider = ({ children }) => {
  const [clients, setClients] = React.useState([]);
  const [users, setUsers] = React.useState();
  const [projects, setProjects] = React.useState([]);
  const [actions, setActions] = React.useState(rawActions);
  const [infos, setInfos] = React.useState(rawInfos);
  const [decisions, setDecisions] = React.useState(rawDecisions);
  const [risks, setRisks] = React.useState(rawRisks);
  const [problems, setProblems] = React.useState(rawProblems);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertContent, setAlertContent] = React.useState({
    content: "",
    type: "",
  });
  const [currentClient, setCurrentClient] = React.useState(null);
  const [currentProject, setCurrentProject] = React.useState(null);

  const [user, setUser] = React.useState(userData);

  return (
    <Context.Provider
      value={{
        user: user,
        setUser: setUser,
        users: users,
        setUsers: setUsers,
        alertContent: alertContent,
        setAlertContent: setAlertContent,
        openAlert: openAlert,
        setOpenAlert: setOpenAlert,
        clients: clients,
        setClients: setClients,
        projects: projects,
        setProjects: setProjects,
        actions: actions,
        setActions: setActions,
        infos: infos,
        setInfos: setInfos,
        decisions: decisions,
        setDecisions: setDecisions,
        risks: risks,
        setRisks: setRisks,
        problems: problems,
        setProblems: setProblems,
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
