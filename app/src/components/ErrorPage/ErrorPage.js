import { useNavigate } from "react-router";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Button from "../../materials/Button/Button";
import logo from "../../assets/images/icon.png";
import LoadingAnimation from "../../materials/LoadingAnimation/LoadingAnimation";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Backdrop>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <LoadingAnimation />
        <h1
          style={{
            color: "white",
            fontSize: "3rem",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <img src={logo} alt="" style={{ height: "50px", width: "auto" }} />{" "}
          Erreur 404.
        </h1>
        <h3
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            fontWeight: "normal",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          La page demandée ne semble pas exister...
          <Button
            style={{ height: "40px", fontWeight: "normal", marginTop: "30px" }}
            onClick={() => navigate("/")}
          >
            Revenir en lieu sûr
          </Button>
        </h3>
      </div>
    </Backdrop>
  );
};

export default ErrorPage;
