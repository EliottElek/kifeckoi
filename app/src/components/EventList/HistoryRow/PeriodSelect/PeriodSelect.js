import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import getPeriod from "../../../../assets/functions/getPeriod";
import getPreviousPeriod from "../../../../assets/functions/getPreviousPeriod";

const options = [
  {
    value: getPeriod(),
    bg: "rgba(0, 204, 255, 0.15)",
  },
  {
    value: getPreviousPeriod(),
    bg: "#dfbb194f",
  },
  {
    value: "Y22W25",
    bg: "#7a8596",
  },
  {
    value: "Y22W24",
    bg: "#7a9688",
  },
  {
    value: "Y22W23",
    bg: "#bfa263",
  },
  {
    value: "Y22W22",
    bg: "#bf8563",
  },
];
export default function PeriodSelect({ defaultValue }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [active, setActive] = React.useState({
    value: defaultValue,
    bg: "#dfbb194f",
  });
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnclickItem = (value) => {
    setActive(value);
    handleClose();
  };
  const styles = {
    menuItem: {
      fontSize: "0.9rem",
    },
    button: {
      display: "flex",
      padding: "0px 4px",
      alignItems: "center",
      background: active?.bg,
      border: "solid 1px var(--border-color)",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "0.9rem",
      width: "90px",
    },
  };
  return (
    <div>
      <button style={styles.button} onClick={handleClick}>
        {active.value} {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            sx={styles.menuItem}
            onClick={() => handleOnclickItem(option)}
          >
            {option.value}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
