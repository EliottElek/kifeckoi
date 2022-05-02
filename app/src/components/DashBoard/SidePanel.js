import React from "react";
import ListItem from "../../materials/List/ListItem";
import List from "../../materials/List/List";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router";
import MenuAccordion from "../../materials/MenuAccordion/MenuAccordion";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_CLIENTS,
  FIND_PROJECTS_BY_CLIENT_ID,
} from "../../graphql/queries";
import "./DashBoard.scss";
const SidePanel = () => {
  const {
    currentProject,
    clients,
    setClients,
    projects,
    setProjects,
    currentClient,
    user,
  } = React.useContext(Context);
  const dataClients = useQuery(GET_ALL_CLIENTS, {
    variables: { userId: user?.id },
  });
  const dataProjects = useQuery(FIND_PROJECTS_BY_CLIENT_ID, {
    variables: { clientId: currentClient?.id, userId: user?.id },
  });
  React.useEffect(() => {
    if (dataClients?.data) {
      setClients(dataClients?.data?.getAllClients);
    }
  }, [setClients, dataClients?.data]);
  React.useEffect(() => {
    if (dataProjects?.data && currentClient) {
      setProjects(dataProjects?.data?.findProjectsByClientId);
    } else {
      setProjects([]);
    }
  }, [setProjects, dataProjects?.data, currentClient]);
  const navElements = [
    { id: "global", name: "Status global" },
    { id: "actions", name: "Actions" },
    { id: "infos", name: "Infos" },
    { id: "decisions", name: "Décisions" },
    { id: "risks", name: "Risques" },
    { id: "problems", name: "Problèmes" },
    { id: "deliverables", name: "Livrables" },
  ];

  const NavItem = ({ comp, id }) => {
    const navigate = useNavigate();
    return (
      <ListItem
        id={id}
        onClick={() => navigate(`/project/${currentProject?.id}/${comp?.id}`)}
      >
        <span>{comp?.name}</span>
      </ListItem>
    );
  };
  const ProjectItem = ({ comp, id }) => {
    const navigate = useNavigate();
    return (
      <ListItem id={id} onClick={() => navigate(`/project/${comp?.id}/global`)}>
        <span>{comp?.name}</span>
      </ListItem>
    );
  };
  const ClientItem = ({ comp, id }) => {
    const navigate = useNavigate();
    return (
      <ListItem id={id} onClick={() => navigate(`/client/${comp?.id}`)}>
        <span>{comp?.name}</span>
      </ListItem>
    );
  };
  const EventsNav = () => {
    return (
      <List>
        {navElements?.map((comp, i) => (
          <NavItem key={i} comp={comp} id={comp.id} />
        ))}
      </List>
    );
  };
  const ProjectsNav = () => {
    return (
      <List>
        {projects?.map((comp, i) => (
          <ProjectItem key={i} comp={comp} id={comp.id} />
        ))}
      </List>
    );
  };
  const ClientsNav = () => {
    return (
      <List>
        {clients?.map((comp, i) => (
          <ClientItem key={i} comp={comp} id={comp.id} />
        ))}
      </List>
    );
  };
  return (
    <div className="sticky__side__nav">
      {currentProject && (
        <MenuAccordion defaultOpen title={"Évènements"} content={EventsNav()} />
      )}
      {currentClient && (
        <MenuAccordion defaultOpen title={"Projets"} content={ProjectsNav()} />
      )}
      <MenuAccordion defaultOpen title={"Clients"} content={ClientsNav()} />
    </div>
  );
};

export default SidePanel;
