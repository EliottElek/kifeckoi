import React from "react";
export const Context = React.createContext();
const { v4: uuid } = require("uuid");

const projectsData = [
  {
    name: "Royal Canin",
    id: uuid(),
    goLive: "06 juin 2022",
  },
  {
    name: "Hermes",
    id: uuid(),
    goLive: "12 juin 2022",
  },
  {
    name: "Silinen",
    id: uuid(),
    goLive: "23 juin 2022",
  },
];
export const ContextProvider = ({ children }) => {
  const [projects, setProjects] = React.useState(projectsData);
  return (
    <Context.Provider
      value={{
        projects: projects,
        setProjects: setProjects,
      }}
    >
      {children}
    </Context.Provider>
  );
};
