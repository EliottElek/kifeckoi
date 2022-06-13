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
    <Box
      sx={{
        display: "flex",
        minHeight: "-webkit-fill-available",
        overflowY: "auto",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",
          background: "transparent",
        }}
      >
        <StickyNavAdvanced advanced={props.advanced} />
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
              bgcolor: "var(--panel-background)",
            },
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "60px",
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
              style={{ margin: "30px" }}
              className="logo__kifekoi"
            />
          </div>
          {props.secondaryContent}
          <div
            style={{
              backgroundColor: "var(--panel-background)",
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: "white",
                opacity: "0.7",
                fontSize: "0.7rem",
                fontStyle: "italic",
              }}
            >
              Kifekoi 2022. All rights reserved.
            </span>
          </div>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "var(--panel-background)",
            },
          }}
          open
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "85px",
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
              style={{ paddingTop: "10px", paddingLeft: "20px", height: "42px" }}
              className="logo__kifekoi"
            />
          </div>
          {props.secondaryContent}
          <div
            style={{
              backgroundColor: "var(--panel-background)",
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: "white",
                opacity: "0.7",
                fontSize: "0.7rem",
                fontStyle: "italic",
              }}
            >
              Kifekoi 2022. All rights reserved.
            </span>
          </div>
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
          overflowX: "hidden",
        }}
      >
        <Toolbar sx={{ minHeight: "65px!important" }} />
        {props.mainContent}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
