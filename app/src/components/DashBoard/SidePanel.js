import React from "react";
import { Context } from "../Context/Context";
import { useQuery } from "@apollo/client";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { BsChatFill } from "react-icons/bs";
import {
  GET_ALL_CLIENTS,
  FIND_PROJECTS_BY_CLIENT_ID,
} from "../../graphql/queries";
import "./DashBoard.scss";
import { NavLink } from "react-router-dom";
import TreeViewEvents from "./TreeViewEvents";
import TreeViewProjects from "./TreeEventsProjects";
import DashboardIcon from "@mui/icons-material/Dashboard";
const SidePanel = () => {
  const {
    currentProject,
    setClients,
    projects,
    setProjects,
    currentClient,
    user,
    setOpenDrawer,
  } = React.useContext(Context);
  useQuery(GET_ALL_CLIENTS, {
    variables: { userId: user?.id },
    onCompleted: (data) => {
      setClients(data?.getAllClients);
    },
  });
  useQuery(FIND_PROJECTS_BY_CLIENT_ID, {
    variables: { clientId: currentClient?.id, userId: user?.id },
    onCompleted: (data) => {
      if (currentClient) {
        setProjects(data?.findProjectsByClientId);
      } else {
        setProjects([]);
      }
    },
  });

  const defaultNavElements = [
    { name: "Dashboard", icon: <DashboardIcon />, to: "/" },
    {
      name: "Clients",
      icon: <PeopleAltIcon />,
      to: `/clients`,
    },
    {
      name: "Chat",
      icon: <BsChatFill />,
      to: `/chat`,
    },
  ];
  return (
    <div className="sticky__side__nav">
      <ul className="default__menu">
        {defaultNavElements.map((item) => (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "dashboard__menu__item active__menu__item"
                  : "dashboard__menu__item"
              }
              to={item.to}
              onClick={() => setOpenDrawer(false)}
            >
              {item.icon}
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div>
        {currentProject && <TreeViewEvents />}
        <TreeViewProjects projects={projects} />
      </div>
    </div>
  );
};

export default SidePanel;
