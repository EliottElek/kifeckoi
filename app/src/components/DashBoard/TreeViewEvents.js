import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Context } from "../Context/Context";
import { useNavigate, useParams } from "react-router";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import TimelineIcon from "@mui/icons-material/Timeline";
const styles = {
  treeItem: {
    "& .MuiTreeItem-content": {
      height: "40px",
      minWidth: "none",
      color: "white",
      borderRight: "solid 4px transparent",
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
export default function TreeViewEvents() {
  const navigate = useNavigate();
  const { schema } = useParams();
  const { currentProject, setOpenDrawer } = React.useContext(Context);
  return (
    <TreeView
      aria-label="file system navigator"
      defaultExpanded={["1"]}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ overflow: "hidden" }}
    >
      <TreeItem nodeId="1" label="Tableaux" sx={styles.treeItem}>
        <TreeItem
          onClick={() => {
            setOpenDrawer(false);
            navigate(`/project/${currentProject?.id}/global`);
          }}
          nodeId={"global"}
          label={
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <TimelineIcon />
              Global
            </span>
          }
          sx={
            window?.location?.href.split("/")[
              window?.location?.href.split("/").length - 1
            ] === "global"
              ? styles.treeItemActive
              : styles.treeItem
          }
        />
        {currentProject?.eventsSchema?.map((nav) => (
          <TreeItem
            key={nav.id}
            onClick={() => {
              setOpenDrawer(false);
              navigate(
                `/project/${currentProject?.id}/${nav?.title.toLowerCase()}?display=kanban`
              );
            }}
            nodeId={nav?.id}
            label={
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <ViewKanbanIcon
                  sx={{
                    background: nav.backgroundUrl,
                    padding: "1px",
                    borderRadius: "3px",
                  }}
                />
                {nav.title}
              </span>
            }
            sx={
              schema === nav.title.toLowerCase()
                ? styles.treeItemActive
                : styles.treeItem
            }
          />
        ))}
      </TreeItem>
    </TreeView>
  );
}
