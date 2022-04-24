import React from "react";
import "./Drawer.scss";
import { Context } from "../../components/Context/Context";
const Drawer = ({ mainContent, secondaryContent, drawerWidth }) => {
  const { openDrawer } = React.useContext(Context);

  return (
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
  );
};

export default Drawer;
