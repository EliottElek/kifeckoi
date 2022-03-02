import React from "react";
export const Context = React.createContext();
const { v4: uuid } = require("uuid");

const projectsData = [
  {
    name: "Royal Canin",
    id: uuid(),
    goLive: "06 juin 2022",
    cop: "23 juin 2022",
  },
  {
    name: "Hermes",
    id: uuid(),
    goLive: "12 juin 2022",
    cop: "03 avril 2022",
  },
  {
    name: "Silinen",
    id: uuid(),
    goLive: "23 juin 2022",
    cop: "29 mai 2022",
  },
];
const userData = {
  firstname: "Xavier",
  lastname: "Moquin",
  admin: true,
  email: "xmoquin@gmail.com",
};
export const ContextProvider = ({ children }) => {
  const [projects, setProjects] = React.useState(projectsData);
  const [user, setUser] = React.useState(userData);

  return (
    <Context.Provider
      value={{
        user: user,
        setUser: setUser,
        projects: projects,
        setProjects: setProjects,
      }}
    >
      {children}
    </Context.Provider>
  );
};
