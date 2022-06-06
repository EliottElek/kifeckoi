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
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
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
    <div style={{ display: "flex" }}>
      <StyledToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="list" aria-label="left aligned">
          <FormatListBulletedIcon style={{ color: "var(--font-color)" }} />
        </ToggleButton>
        <ToggleButton value="grid" aria-label="centered">
          <GridViewIcon style={{ color: "var(--font-color)" }} />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <ToggleButton onClick={handleClickFilter} style={{ border: "none" }}>
        <FilterAltIcon style={{ color: "var(--font-color)" }} />
        <ArrowDropDownIcon style={{ color: "var(--font-color)" }} />
      </ToggleButton>
      <Menu
        anchorEl={anchorElFilter}
        open={openFilter}
        onClose={handleCloseFilter}
        sx={{
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
          Afficher les évènements en status vérifier
        </MenuItem>
      </Menu>
    </div>
  );
}
