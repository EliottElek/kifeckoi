import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import {
  IconButton,
  Modal,
  InputBase,
  Paper,
  Box,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Context } from "../Context/Context";
import { useGetAllEventsAllTypes } from "../../hooks/queries/event";
import { useParams } from "react-router";
import RenderHtml from "../../assets/RenderHtml";
import { NavLink } from "react-router-dom";
const SearchBar = () => {
  const { currentProject } = React.useContext(Context);
  const { id } = useParams();
  const [events, setEvents] = React.useState([]);
  const getAllEvents = useGetAllEventsAllTypes({
    variables: {
      id: id,
    },
    onCompleted: (data) => {
      setEvents(data.getAllEventsAllTypes);
    },
  });
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const style = {
    position: "fixed",
    top: "50px",
    left: "50%",
    padding: "12px",
    transform: "translate(-50%,0%)",
    maxHeight: fullScreen ? "-webkit-fill-available" : "80%",
    width: fullScreen ? "95vw" : "85%",
    maxWidth: fullScreen ? "none" : "600px",
    boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
    borderRadius: fullScreen ? "0px" : "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "var(--card-background)",
  };
  const [filteredData, setFilteredData] = React.useState([]);
  const [wordEntered, setWordEntered] = React.useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = events.filter((value) => {
      return value?.description
        ?.toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const ResultItem = ({ item }) => {
    return (
      <ListItemButton
        disableRipple
        component={NavLink}
        to={`/project/${id}/${item.type.toLowerCase()}/${
          item.id
        }?display=kanban`}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "& img ": {
            height: "60px",
            width: "80px",
            objectFit: "cover",
          },
        }}
      >
        <RenderHtml>{item.description}</RenderHtml>
        <Typography variant="caption">{item.project.name}</Typography>
      </ListItemButton>
    );
  };
  const onClose = () => {
    setOpen(false);
    clearInput();
  };
  return (
    <>
      {!open ? (
        <IconButton
          sx={{ display: { xs: "none", md: "flex" } }}
          onClick={() => {
            getAllEvents.refetch();
            setOpen(true);
          }}
        >
          <SearchIcon sx={{ color: "var(--font-color)", opacity: "0.7" }} />
        </IconButton>
      ) : (
        <Modal onClose={onClose} open={open}>
          <Box sx={style}>
            <Paper
              elevation={0}
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                border: "solid 1px var(--border-color)",
              }}
            >
              <InputBase
                autoFocus
                value={wordEntered}
                onChange={handleFilter}
                sx={{ ml: 1, flex: 1 }}
                placeholder={`Rechercher dans ${currentProject?.name}`}
                inputProps={{ "aria-label": "search google maps" }}
              />
              {filteredData.length === 0 ? (
                <IconButton sx={{ p: "10px" }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              ) : (
                <IconButton
                  sx={{ p: "10px" }}
                  aria-label="close"
                  onClick={clearInput}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Paper>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                overflow: "auto",
                width: "100%",
              }}
            >
              {filteredData.length !== 0 && (
                <List sx={{ maxHeight: "100%" }}>
                  {filteredData.slice(0, 15).map((item, index) => (
                    <ResultItem item={item} key={index} />
                  ))}
                </List>
              )}
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default SearchBar;
