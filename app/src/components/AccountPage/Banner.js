import React from "react";
import "./AccountPage.scss";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { Context } from "../Context/Context";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const styles = {
  tab: {
    "&.Mui-selected": { color: "var(--main-color)" },
    color: "var(--font-color)",
    textTransform: "none",
    fontSize: "1rem",
  },
};
const Banner = () => {
  const [value, setValue] = React.useState(0);
  const { user } = React.useContext(Context);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="banner">
        <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              border: "solid 2px var(--border-color)",
            }}
            src={user?.avatarUrl}
          />
          <Box sx={{ padding: "12px" }}>
            <Typography
              variant="h5"
            >
              {user?.firstname} {user?.lastname}
            </Typography>
            <Typography
              variant="p2"
              sx={{ opacity: "0.8", color: "var(--main-color)" }}
            >
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{ justifyContent: "flex-end" }}
          >
            <Tab
              sx={styles.tab}
              disableRipple
              label="Profil"
              {...a11yProps(0)}
            />
            <Tab
              sx={styles.tab}
              disableRipple
              label="Paramètres"
              {...a11yProps(1)}
            />
            <Tab
              sx={styles.tab}
              disableRipple
              label="Sécurité"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
      </div>
      <Box>
        <TabPanel value={value} index={0}>
          Profil
        </TabPanel>
        <TabPanel value={value} index={1}>
          Paramètres
        </TabPanel>
        <TabPanel value={value} index={2}>
          Sécurité
        </TabPanel>
      </Box>
    </>
  );
};

export default Banner;
