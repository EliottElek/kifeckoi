import React from "react";
import rawEvents from "../../rawEvents";
import { GET_USER_BY_ID } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import jwt from "jsonwebtoken";
export const Context = React.createContext();
const channelsD = [
  {
    id: "1",
    seen: false,
    users: [
      {
        firstname: "Paul",
        lastname: "Moquin",
        id: "2343",
        avatarUrl:
          "https://www.gala.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2F8e7856b3-7f1e-4d09-b428-6d16c8a9f6f0.2Ejpeg/2216x1536/quality/80/mark-ruffalo.jpeg",
      },
      {
        firstname: "Eliott",
        lastname: "Morcillo",
        id: "fbc32848-f0fb-40c4-9b8c-71dde10b9665",
      },
    ],
    lastmessage: {
      id: "3",
      content: "Content of the last message.",
    },
  },
  {
    id: "2",
    seen: true,
    users: [
      {
        firstname: "Henri",
        lastname: "Jean",
        id: "2343",
        avatarUrl:
          "https://fr.web.img6.acsta.net/c_310_420/pictures/16/07/13/11/18/135527.jpg",
      },
      {
        firstname: "Eliott",
        lastname: "Morcillo",
        id: "fbc32848-f0fb-40c4-9b8c-71dde10b9665",
      },
    ],
    lastmessage: {
      id: "3",
      content: "Content of the last message.",
    },
  },
  {
    id: "3",
    seen: true,
    users: [
      {
        firstname: "Jean",
        lastname: "Henri",
        id: "2343",
      },
      {
        firstname: "Eliott",
        lastname: "Morcillo",
        id: "fbc32848-f0fb-40c4-9b8c-71dde10b9665",
      },
    ],
    lastmessage: {
      id: "3",
      content: "Content of the last message.",
    },
  },
];
export const ContextProvider = ({ children }) => {
  const [clients, setClients] = React.useState([]);
  const [users, setUsers] = React.useState();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [events, setEvents] = React.useState(rawEvents);
  const [selectedEvents, setSelectedEvents] = React.useState([]);
  const [currentClient, setCurrentClient] = React.useState(null);
  const [currentProject, setCurrentProject] = React.useState(null);
  const [channels, setChannels] = React.useState(channelsD);
  const [channel, setChannel] = React.useState(null);
  const [listStyle, setListStyle] = React.useState(false);
  const [markdown, setMarkdown] = React.useState(true);
  const [dark, setDark] = React.useState(true);
  const [auth, setAuth] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [addCard, setAddCard] = React.useState(false);
  const [eventsData, setEventsData] = React.useState([]);
  const [dataEvents, setDataEvents] = React.useState(null);
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
        eventsData: eventsData,
        setEventsData: setEventsData,
        setUsers: setUsers,
        clients: clients,
        setClients: setClients,
        projects: projects,
        setProjects: setProjects,
        events: events,
        setEvents: setEvents,
        selectedEvents: selectedEvents,
        setSelectedEvents: setSelectedEvents,
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
        setAddCard: setAddCard,
        addCard: addCard,
        channel: channel,
        channels: channels,
        setChannel: setChannel,
        setChannels: setChannels,
        dataEvents: dataEvents,
        setDataEvents: setDataEvents,
      }}
    >
      {children}
    </Context.Provider>
  );
};
