import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 35,
  marginLeft: "18px",
  height: 22,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 22,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(14px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "var(--main-color)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 18,
    height: 18,
    borderRadius: "50%",
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 11,
    opacity: 1,
    backgroundColor: "var(--color-background2)",
    border: "solid 1px var(--border-color)",
    boxSizing: "border-box",
  },
}));
export default StyledSwitch;
