import React from "react";
import rawEvents from "../../rawEvents";
import { GET_USER_BY_ID } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import jwt from "jsonwebtoken";
export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [clients, setClients] = React.useState([]);
  const [users, setUsers] = React.useState();
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const [projects, setProjects] = React.useState([]);
  const [events, setEvents] = React.useState(rawEvents);
  const [currentClient, setCurrentClient] = React.useState(null);
  const [currentProject, setCurrentProject] = React.useState(null);
  const [listStyle, setListStyle] = React.useState(false);
  const [markdown, setMarkdown] = React.useState(true);
  const [dark, setDark] = React.useState(true);
  const [auth, setAuth] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const SECRET_KEY = "secret!";

  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      var userId = decoded.id;
    } catch (err) {
      setAuth(false);
      localStorage.removeItem("token");
    }
  }
  const getUserById = useQuery(GET_USER_BY_ID, {
    variables: { userId: userId },
  });
  React.useEffect(() => {
    if (getUserById?.data?.successful === false || !userId) {
      setAuth(false);
      localStorage.removeItem("token");
    }
    if (userId) {
      setUser(getUserById?.data?.getUserById);
      setAuth(true);
    } else {
      setAuth(false);
      localStorage.removeItem("token");
    }
  }, [getUserById, setUser, userId, setAuth]);
  const setDarkTheme = () => {
    // 2
    localStorage.setItem("theme", "dark");

    // 3
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLightTheme = () => {
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
    setDarkTheme();
  }
  // 5
  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <Context.Provider
      value={{
        auth: auth,
        setAuth: setAuth,
        toggleTheme: toggleTheme,
        defaultDark: defaultDark,
        setOpenDrawer: setOpenDrawer,
        openDrawer: openDrawer,
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
        handleLogout: handleLogout,
        getUserById: getUserById,
      }}
    >
      {children}
    </Context.Provider>
  );
};
