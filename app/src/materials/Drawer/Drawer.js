import React from "react";
import "./Drawer.scss";
import useWindowDimensions from "../../hooks/useWindowsDimensions";

const Drawer = ({
  style,
  mainContent,
  secondaryContent,
  drawerWidth,
  breakPoint,
}) => {
  const { width } = useWindowDimensions();
  const [mobileView, setMobileWiew] = React.useState(false);

  React.useEffect(() => {
    if (width <= breakPoint) {
      setMobileWiew(true);
    } else {
      setMobileWiew(false);
    }
  }, [setMobileWiew, breakPoint, width]);

  return (
    <>
      {!mobileView ? (
        <div
          className="drawer_container"
          style={{
            ...style,
            display: "grid",
            gridTemplateColumns: `${drawerWidth}px calc(100% - ${drawerWidth}px)`,
          }}
        >
          <div className="drawer_container_secondary">{secondaryContent}</div>
          <div className="drawer_container_main">{mainContent}</div>
        </div>
      ) : (
        <div
          className="drawer_container"
          style={{
            ...style,
            display: "grid",
            gridTemplateColumns: `100%`,
          }}
        >
          <div className="drawer_container_main">{mainContent}</div>
        </div>
      )}
    </>
  );
};

export default Drawer;
