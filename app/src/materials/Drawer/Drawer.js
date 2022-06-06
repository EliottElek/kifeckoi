import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import StickyNavAdvanced from "../../components/StickyNavbar/StickyNavBarAdvanced";
import { Context } from "../../components/Context/Context";
import { useNavigate } from "react-router";
import logo from "../../assets/images/logo.png";
const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const navigate = useNavigate();
  const { openDrawer, setOpenDrawer, setCurrentClient, setCurrentProject } =
    React.useContext(Context);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflowY: "auto" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",
          background: "transparent",
        }}
      >
        <StickyNavAdvanced />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={openDrawer}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "var(--color-background-2)",
            },
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "55px",
              borderBottom: "solid 1px var(border-color)",
            }}
          >
            <img
              onClick={() => {
                setCurrentProject(null);
                setCurrentClient(null);
                navigate(`/`);
              }}
              src={logo}
              alt=""
              className="logo__kifekoi"
            />
          </div>
          {props.secondaryContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "var(--color-background-2)",
            },
          }}
          open
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "55px",
              borderBottom: "solid 1px var(--border-color)",
            }}
          >
            <img
              onClick={() => {
                setCurrentProject(null);
                setCurrentClient(null);
                navigate(`/`);
              }}
              src={logo}
              alt=""
              className="logo__kifekoi"
            />
          </div>
          {props.secondaryContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: "var(--background1)",
        }}
      >
        <Toolbar />
        {props.mainContent}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
