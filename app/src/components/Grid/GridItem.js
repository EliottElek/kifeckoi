import "./Grid.scss";
import { Paper } from "@mui/material";
const GridItem = ({ children, onClick }) => {
  return (
    <Paper
      onClick={onClick}
      sx={{
        bgcolor: "var(--card-background)",
        cursor: "pointer",
        color: "var(--font-color)",
      }}
    >
      {children}
    </Paper>
  );
};

export default GridItem;
