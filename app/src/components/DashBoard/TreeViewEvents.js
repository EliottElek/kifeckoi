import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import TimelineIcon from "@mui/icons-material/Timeline";
const styles = {
  treeItem: {
    "& .MuiTreeItem-content": {
      height: "40px",
      minWidth: "none",
      color: "white",
      borderRight: "solid 3px transparent",
    },
    "& .MuiTreeItem-group": {
      marginLeft: "0px",
      "& .MuiTreeItem-content": {
        paddingLeft: "17px",
        width: "auto",
      },
    },
  },
  treeItemActive: {
    "& .MuiTreeItem-content": {
      height: "40px",
      color: "white",
      borderColor: "var(--main-color)",
      backgroundColor: "rgba(25, 118, 210, 0.08)",
    },
    "& .MuiTreeItem-group": {
      marginLeft: "0px",
      "& .MuiTreeItem-content": {
        paddingLeft: "17px",
        width: "auto",
      },
    },
  },
};
const navElements = [
  { id: "global", name: "Overview", icon: <TimelineIcon /> },
  { id: "actions", name: "Actions", icon: <ViewKanbanIcon /> },
  { id: "infos", name: "Infos", icon: <ViewKanbanIcon /> },
  { id: "decisions", name: "Décisions", icon: <ViewKanbanIcon /> },
  { id: "risks", name: "Risques", icon: <ViewKanbanIcon /> },
  { id: "problems", name: "Problèmes", icon: <ViewKanbanIcon /> },
  { id: "deliverables", name: "Livrables", icon: <ViewKanbanIcon /> },
];
export default function TreeViewEvents() {
  const navigate = useNavigate();
  const { currentProject, setOpenDrawer } = React.useContext(Context);
  return (
    <TreeView
      aria-label="file system navigator"
      expanded={["1"]}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ overflow: "hidden" }}
    >
      <TreeItem nodeId="1" label="Évènements" sx={styles.treeItem}>
        {navElements.map((nav) => (
          <TreeItem
            key={nav.id}
            onClick={() => {
              setOpenDrawer(false);
              navigate(`/project/${currentProject?.id}/${nav?.id}`);
            }}
            nodeId={nav?.id}
            label={
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {nav.icon}
                {nav.name}
              </span>
            }
            sx={
              window?.location?.href.split("/")[5] === nav.id
                ? styles.treeItemActive
                : styles.treeItem
            }
          />
        ))}
      </TreeItem>
    </TreeView>
  );
}
