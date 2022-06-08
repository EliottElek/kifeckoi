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
export default function TreeViewProjects() {
  const navigate = useNavigate();
  const { setOpenDrawer, user, currentProject } = React.useContext(Context);
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ overflow: "hidden" }}
    >
      <TreeItem nodeId="2" label="Projets" sx={styles.treeItem}>
        {user?.projects?.map((nav) => (
          <TreeItem
            onClick={() => {
              setOpenDrawer(false);
              navigate(`/project/${nav?.id}`);
            }}
            nodeId={nav?.id}
            label={nav.name}
            sx={
              currentProject?.id === nav.id
                ? styles.treeItemActive
                : styles.treeItem
            }
          />
        ))}
      </TreeItem>
    </TreeView>
  );
}
