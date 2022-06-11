import "./Grid.scss";
import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
const GridItem = ({ children, to }) => {
  return (
    <Paper
      component={NavLink}
      to={to}
      sx={{
        bgcolor: "var(--card-background)",
        cursor: "pointer",
        color: "var(--font-color)",
        textDecoration: "none",
      }}
    >
      {children}
    </Paper>
  );
};

export default GridItem;
