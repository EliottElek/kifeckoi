import React from "react";
import "./Drawer.scss";
import { Context } from "../../components/Context/Context";
import StickyNavDefault from "../../components/StickyNavbar/StickyNavBarDefault";
import StickyNavAdvanced from "../../components/StickyNavbar/StickyNavBarAdvanced";
const Drawer = ({ mainContent, secondaryContent, advanced }) => {
  const { openDrawer } = React.useContext(Context);

  return (
    <div className="very__main__container">
      {advanced ? <StickyNavAdvanced /> : <StickyNavDefault />}
      <div
        className={
          openDrawer ? "drawer_container" : "drawer_container closed__container"
        }
      >
        <div
          className={
            openDrawer
              ? "drawer_container_secondary"
              : "drawer_container_secondary closed__secondary"
          }
        >
          {secondaryContent}
        </div>
        <div className="drawer_container_main">{mainContent}</div>
      </div>
    </div>
  );
};

export default Drawer;
