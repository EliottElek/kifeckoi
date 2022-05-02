import { useMutation } from "@apollo/client";
import React from "react";
import { Navigate, useNavigate } from "react-router";
import logo from "../../assets/images/logo.png";
import { CREATE_USER } from "../../graphql/mutations";
import Button from "../../materials/Button/Button";
import InputText from "../../materials/InputText/InputText";
import { Context } from "../Context/Context";
import { toast } from "react-toastify";
import "../Login/Login.scss";
const SignUp = () => {
  const { auth } = React.useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifpassword, setVerifpassword] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [username, setUsername] = React.useState("");

  const [createUser] = useMutation(CREATE_USER);
  if (auth) return <Navigate to={-1} />;

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      email === "" ||
      password === "" ||
      username === "" ||
      lastname === "" ||
      firstname === "" ||
      verifpassword === ""
    )
      return toast.warning("Tous les champs doivent être remplis.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    if (password !== verifpassword)
      return toast.warning("Les mots de passe ne correspondent pas.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    try {
      const response = await createUser({
        variables: {
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          username: username,
          avatarUrl: "",
        },
      });
      if (response.data.createUser.successful) {
        localStorage.setItem("token", response.data.createUser.token);
        window.location.href = "/";
      } else {
        toast.error(response.data.createUser.message, {
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
    <div className="signup__container">
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
          <h1>Créez un compte</h1>
          <InputText
            placeHolder="Votre prénom..."
            label="Prénom"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <InputText
            placeHolder="Votre nom..."
            label="Nom"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <InputText
            placeHolder="Votre email..."
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputText
            placeHolder="Votre pseudo..."
            label="Pseudo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputText
            placeHolder="Votre mot de passe..."
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputText
            placeHolder="Vérifiez votre mot de passe..."
            label="Mot de passe de vérification"
            type="password"
            value={verifpassword}
            onChange={(e) => setVerifpassword(e.target.value)}
          />
        </div>
        <div className={"top__login__card"}>
          <button
            type="button"
            className="new__account__btn"
            onClick={() => navigate("/login")}
          >
            Vous avez déjà de compte ? Connectez-vous.
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

export default SignUp;
