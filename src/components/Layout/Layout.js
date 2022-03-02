import React, { useContext } from "react";
import NavBar from "../../materials/NavBar/NavBar";
import { Context } from "../Context/Context";
import "./Layout.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import List from "../../materials/List/List";
import ListItem from "../../materials/List/ListItem";
const Layout = ({ children }) => {
  const { projects, user } = useContext(Context);
  const navigate = useNavigate();

  const NavItem = ({ comp, id }) => {
    const location = useLocation();

    const [active, setActive] = React.useState(false);
    React.useEffect(() => {
      const idParams = window.location.href.split("/#");
      if (idParams[1] === id) {
        setActive(true);
      } else {
        setActive(false);
      }
    }, [id, location]);
    return (
      <ListItem id={id} active={active}>
        <a href={`#${comp.id}`}>{comp.title}</a>
      </ListItem>
    );
  };
  const Navigation = () => {
    return (
      <div style={{ position: "fixed", width: "240px", margin: 10 }}>
        <List>
          {projects.map((comp, i) => (
            <NavItem key={i} comp={comp} id={comp.id} />
          ))}
        </List>
      </div>
    );
  };
  const ContentDesktop = () => {
    return (
      <div
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          height: "100%",
          width: "100%",
          background: "#fefefe",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" className="logo_container">
          <div className="logo">
            <div className="logo_inner">
              <div className="logo_inner_inner" />
            </div>
          </div>
          <div>
            <h3>KIFEKOI</h3>
          </div>
        </a>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {user?.firstname} {user?.lastname} {user.admin && "(admin)"}
          <button
            className="account__button"
            href="#"
            onClick={() => navigate("/account")}
          >
            <i className="gg-profile"></i>
          </button>
        </div>
      </div>
    );
  };
  const ContentMobile = () => {
    return (
      <div
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          height: "100%",
          width: "100%",
          background: "#fefefe",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" className="logo_container">
          <div className="logo">
            <div className="logo_inner">
              <div className="logo_inner_inner" />
            </div>
          </div>
          <div>
            <h3>KIFEKOI</h3>
          </div>
        </a>
      </div>
    );
  };
  return (
    <div>
      <NavBar
        breakPoint={800}
        contentDesktop={ContentDesktop()}
        contentMobile={ContentMobile()}
        drawerContent={Navigation()}
      />
      {children}
    </div>
  );
};
export default Layout;
