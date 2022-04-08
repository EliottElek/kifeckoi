import React from "react";
import "./NavBar.scss";
import useWindowsDimensions from "../../hooks/useWindowsDimensions";
import Backdrop from "../Backdrop/Backdrop";

const NavBar = ({
  fixed,
  style,
  breakPoint,
  contentDesktop,
  contentMobile,
  drawerContent,
}) => {
  const [mobileView, setMobileWiew] = React.useState(false);
  const { width } = useWindowsDimensions();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (width <= breakPoint) {
      setMobileWiew(true);
    } else {
      setMobileWiew(false);
    }
  }, [setMobileWiew, breakPoint, width]);
  return (
    <div style={style} className={fixed ? "navbar_fixed" : "navbar"}>
      {mobileView ? contentMobile : contentDesktop}
      {mobileView && (
        <button className="hamburger" onClick={() => setOpen(true)}>
          <i className="gg-menu"></i>
        </button>
      )}
      {open && <div onClick={() => setOpen(false)}><Backdrop/></div>}
      {mobileView && (
        <div className={open ? "drawer_content open" : "drawer_content"}>
          {drawerContent}
          <button className="close_drawer" onClick={() => setOpen(false)}>
            <i className="gg-close-o"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
