import React from "react";
import { Navigate, useNavigate } from "react-router";
import logo from "../../assets/images/logo.png";
import { useLogin } from "../../hooks/mutations/user";
import Button from "../../materials/Button/Button";
import InputText from "../../materials/InputText/InputText";
import { Context } from "../Context/Context";
import { toast } from "react-toastify";

import "./Login.scss";
const Login = () => {
  const { auth } = React.useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = useLogin();
  if (auth) return <Navigate to={-1} />;

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (email === "")
      return toast.warning("Votre email ne doit pas être vide.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    if (password === "")
      return toast.warning("Votre mot de passe ne doit pas être vide.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    try {
      const response = await login({
        variables: { email: email, password: password },
      });
      if (response.data.login.successful) {
        localStorage.setItem("token", response.data.login.token);
        window.location.href = "/";
      } else {
        toast.error(response.data.login.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    } catch (err) {
      toast.warning("Une erreur au niveau du serveur est survenue.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };
  return (
    <div className="login__container">
      <div className="logo__container">
        <img
          onClick={() => {
            navigate(`/`);
          }}
          src={logo}
          alt=""
          className="logo__kifekoi"
        />
      </div>
      <form className="login__card" onSubmit={handleLogin}>
        <div className={"top__login__card"}>
          <div style={{ height: "60px" }} />

          <h1>Connectez-vous</h1>
          <InputText
            placeHolder="Votre email..."
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputText
            placeHolder="Votre mot de passe..."
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="forgot__password__btn">
            Mot de passe oublié ?
          </button>
        </div>
        <div className={"top__login__card"}>
          <button
            type="button"
            className="new__account__btn"
            onClick={() => navigate("/signup")}
          >
            Vous n'avez pas de compte ? Créez-en un.
          </button>
          <Button
            type={"submit"}
            style={{ width: "100%", padding: "14px" }}
            onClick={handleLogin}
          >
            Se connecter
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
