import * as React from "react";
import { styled } from "@mui/material/styles";
import GridViewIcon from "@mui/icons-material/GridView";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Box } from "@mui/system";
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    height: "40px",
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "var(--font-color)",
    backgroundColor: "var(--toggle-background)",
  },
  margin: theme.spacing(0.5),
  height: "40px",
}));

export default function CustomizedDividers(props) {
  const [alignment, setAlignment] = React.useState("grid");

  const handleAlignment = (event, newAlignment) => {
    props.setAddCard(false);
    if (newAlignment === "list") props.setListStyle(true);
    else props.setListStyle(false);
    setAlignment(newAlignment);
  };
  const [anchorElFilter, setAnchorElFilter] = React.useState(null);
  const openFilter = Boolean(anchorElFilter);
  const handleClickFilter = (event) => {
    setAnchorElFilter(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorElFilter(null);
  };
  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <StyledToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <StyledToggleButton value="list">
          <FormatListBulletedIcon style={{ color: "var(--font-color)" }} />
        </StyledToggleButton>
        <StyledToggleButton value="grid">
          <GridViewIcon style={{ color: "var(--font-color)" }} />
        </StyledToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <StyledToggleButton
        onClick={handleClickFilter}
        style={{ border: "none" }}
      >
        <FilterAltIcon style={{ color: "var(--font-color)" }} />
        <p style={{ fontSize: "0.6rem", color: "var(--font-color)" }}>
          Filtrer
        </p>
        <ArrowDropDownIcon style={{ color: "var(--font-color)" }} />
      </StyledToggleButton>
      <Menu
        anchorEl={anchorElFilter}
        open={openFilter}
        onClose={handleCloseFilter}
        sx={{
          margin: "0.5rem",
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        <MenuItem style={{ fontSize: "0.9rem" }} onClick={(e) => {}}>
          Afficher les évènements créés cette semaine
        </MenuItem>
        <MenuItem style={{ fontSize: "0.9rem" }} onClick={() => {}}>
          Afficher les évènements créés la semaine dernière
        </MenuItem>
        <MenuItem style={{ fontSize: "0.9rem" }}>
          Afficher les évènements en status à vérifier
        </MenuItem>
        <MenuItem style={{ fontSize: "0.9rem" }}>
          Afficher les évènements en status vérifié
        </MenuItem>
      </Menu>
    </Box>
  );
}
