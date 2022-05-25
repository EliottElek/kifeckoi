import { MenuList } from "@mui/material";
import "./Menu.scss";

const Menu = ({ children }) => {
  return <MenuList>{children}</MenuList>;
};

export default Menu;
