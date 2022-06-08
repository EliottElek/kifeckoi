import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router";
const styles = {
  treeItem: {
    "& .MuiTreeItem-content": {
      height: "40px",
      minWidth: "none",
      color: "white",
      borderLeft: "solid 3px transparent",
    },
  },
  treeItemActive: {
    "& .MuiTreeItem-content": {
      height: "40px",
      color: "white",
      borderColor: "var(--main-color)",
      backgroundColor: "rgba(25, 118, 210, 0.08)",
    },
  },
};
const navElements = [
  { id: "global", name: "Overview" },
  { id: "actions", name: "Actions" },
  { id: "infos", name: "Infos" },
  { id: "decisions", name: "Décisions" },
  { id: "risks", name: "Risques" },
  { id: "problems", name: "Problèmes" },
  { id: "deliverables", name: "Livrables" },
];
export default function TreeViewEvents() {
  const navigate = useNavigate();
  const { currentProject, setOpenDrawer } = React.useContext(Context);
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ overflow: "hidden" }}
    >
      <TreeItem nodeId="1" label="Évènements" sx={styles.treeItem}>
        {navElements.map((nav) => (
          <TreeItem
            onClick={() => {
              setOpenDrawer(false);
              navigate(`/project/${currentProject?.id}/${nav?.id}`);
            }}
            nodeId={nav?.id}
            label={nav.name}
            sx={
              window.location.href.split("/").at(-1) === nav.id
                ? styles.treeItemActive
                : styles.treeItem
            }
          />
        ))}
      </TreeItem>
    </TreeView>
  );
}
