import React, { useContext } from "react";
import NavBar from "../../materials/NavBar/NavBar";
import { Context } from "../Context/Context";
import "./Layout.css";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import List from "../../materials/List/List";
import Avatar from "../../materials/Avatar/Avatar";
import ListItem from "../../materials/List/ListItem";
const Layout = ({ children }) => {
  const { clients, user } = useContext(Context);
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
          {clients.map((comp, i) => (
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
          height: "auto",
          width: "auto",
          background: "#22272d",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" className="logo_container">
          <img className="logo_img" alt="logo" src={logo} />
        </a>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            color: "var(--main-color)",
          }}
        >
          {user?.firstname} {user?.lastname}
          {user.admin && <span className="admin_span">admin</span>}
          <button
            className="account__button"
            href="#"
            onClick={() => navigate("/account")}
          >
            <Avatar name={"Mon compte"} src={user?.avatarUrl} />
          </button>
          <button
            className="account__button bell"
            href="#"
            onClick={() => navigate("/account")}
          >
            <i className="gg-bell"></i>
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
          height: "auto",
          width: "auto",
          background: "#22272d",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" className="logo_container">
          <img className="logo_img" alt="logo" src={logo} />
        </a>
      </div>
    );
  };
  return (
    <div className="layout__container">
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
