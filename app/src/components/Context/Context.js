import React from "react";
import rawEvents from "../../rawEvents";
import gravatar from "gravatar";

export const Context = React.createContext();
// 1
const setDark = () => {
  // 2
  localStorage.setItem("theme", "dark");

  // 3
  document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
};

// 4
const storedTheme = localStorage.getItem("theme");

const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
  storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
}

// 5
const toggleTheme = (e) => {
  if (e.target.checked) {
    setDark();
  } else {
    setLight();
  }
};
const userData = {
  id: "1",
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
  const [users, setUsers] = React.useState();
  const [projects, setProjects] = React.useState([]);
  const [events, setEvents] = React.useState(rawEvents);
  const [currentClient, setCurrentClient] = React.useState(null);
  const [currentProject, setCurrentProject] = React.useState(null);
  const [listStyle, setListStyle] = React.useState(false);
  const [markdown, setMarkdown] = React.useState(true);
  const [dark, setDark] = React.useState(true);

  const [user, setUser] = React.useState(userData);

  return (
    <Context.Provider
      value={{
        toggleTheme: toggleTheme,
        defaultDark: defaultDark,
        dark: dark,
        setDark: setDark,
        user: user,
        setUser: setUser,
        users: users,
        setUsers: setUsers,
        clients: clients,
        setClients: setClients,
        projects: projects,
        setProjects: setProjects,
        events: events,
        setEvents: setEvents,
        currentClient: currentClient,
        setCurrentClient: setCurrentClient,
        currentProject: currentProject,
        setCurrentProject: setCurrentProject,
        //defines if the view is in cards or table
        listStyle: listStyle,
        setListStyle: setListStyle,
        markdown: markdown,
        setMarkdown: setMarkdown,
      }}
    >
      {children}
    </Context.Provider>
  );
};
