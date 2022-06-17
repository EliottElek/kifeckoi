import React from "react";
import { Navigate, useNavigate } from "react-router";
import icon from "../../assets/images/icon.png";
import { useCreateUser } from "../../hooks/mutations/user";
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

  const createUser = useCreateUser();
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
      <form className="login__card" onSubmit={handleLogin}>
        <div className={"top__login__card"}>
          <h1 className={"top__login__card__logocontainer"}>
            <img src={icon} className="logo__kifekoi" alt="" /> Kifekoi
          </h1>
          <h3>Créez votre compte Kifekoi.</h3>
          <span className="top__login__already__account">
            Si vous avez déjà un compte,{" "}
            <button
              type="button"
              className="login__btn"
              onClick={() => navigate("/login")}
            >
              connectez-vous.{" "}
            </button>
          </span>
          <div className="firstname__lastname__container">
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
          </div>
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
        <Button
          type={"submit"}
          style={{
            margin: "10px",
            padding: "14px 40px",
            alignSelf: "flex-end",
            marginTop: "40px",
          }}
          onClick={handleLogin}
        >
          Créer le compte
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
