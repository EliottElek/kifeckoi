import React, { useState } from "react";
import "./AdvancedNavBar.scss";
import { CSSTransition } from "react-transition-group";
import DropDownMenuItem from "./DropDownMenuItem";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";

const DropDownMenu = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };
  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        onEnter={calcHeight}
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames={"menu-primary"}
      >
        <div classNames={"menu"}>
          <DropDownMenuItem
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            My profile 🐒
          </DropDownMenuItem>
          <DropDownMenuItem
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            My friends 👯‍♂️
          </DropDownMenuItem>
          <DropDownMenuItem
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            goToMenu="settings"
            rightIcon={<ChevronIcon />}
          >
            Settings ⚙️
          </DropDownMenuItem>
        </div>
      </CSSTransition>
      <CSSTransition
        onEnter={calcHeight}
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames={"menu-secondary"}
      >
        <div classNames={"menu"}>
          <DropDownMenuItem
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            goToMenu="main"
            leftIcon={<ArrowIcon />}
          >
            back
          </DropDownMenuItem>
          <DropDownMenuItem
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            My profile
          </DropDownMenuItem>
          <DropDownMenuItem
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            My profile
          </DropDownMenuItem>
          <DropDownMenuItem
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            My profile
          </DropDownMenuItem>
          <DropDownMenuItem
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            My profile
          </DropDownMenuItem>
          <DropDownMenuItem
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            My profile
          </DropDownMenuItem>
          <DropDownMenuItem
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          >
            My profile
          </DropDownMenuItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropDownMenu;
