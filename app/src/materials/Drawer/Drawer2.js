import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import StickyNavAdvanced from "../../components/StickyNavbar/StickyNavBarAdvanced";
import { Context } from "../../components/Context/Context";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const { openDrawer, setOpenDrawer } = React.useContext(Context);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", height: "100vh", overflowY: "hidden", p: 0 }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <StickyNavAdvanced />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={openDrawer}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none", zIndex: 0 },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "var(--color-background-2)",
              paddingTop: "50px",
            },
          }}
        >
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
          {props.secondaryContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          paddingTop: "50px",
        }}
      >
        {props.mainContent}
      </Box>
    </Box>
  );
}
export default ResponsiveDrawer;
