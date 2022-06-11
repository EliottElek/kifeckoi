import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Modal, InputBase, Paper, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Context } from "../Context/Context";
const SearchBar = () => {
  const { currentProject } = React.useContext(Context);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const style = {
    position: "fixed",
    top: "7%",
    left: "50%",
    padding: "12px",
    transform: "translate(-50%, -50%)",
    maxHeight: fullScreen ? "-webkit-fill-available" : "80%",
    width: fullScreen ? "95vw" : "85%",
    maxWidth: fullScreen ? "none" : "600px",
    boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
    borderRadius: fullScreen ? "0px" : "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--color-background-1)",
  };
  return (
    <>
      {!open ? (
        <IconButton
          sx={{ display: { xs: "none", md: "flex" } }}
          onClick={() => setOpen(!open)}
        >
          <SearchIcon sx={{ color: "var(--font-color)", opacity: "0.7" }} />
        </IconButton>
      ) : (
        <Modal onClose={() => setOpen(false)} open={open}>
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
                sx={{ ml: 1, flex: 1 }}
                placeholder={`Rechercher dans ${currentProject?.name}`}
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default SearchBar;
