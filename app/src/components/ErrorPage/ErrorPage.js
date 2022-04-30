import React from "react";
import { useNavigate } from "react-router";
import Backdrop from "../../materials/Backdrop/Backdrop";
import Button from "../../materials/Button/Button";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Backdrop>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ color: "white" }}>Impossible de trouver le projet...</h1>
        <h3
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            fontWeight: "normal",
          }}
        >
          <Button
            style={{ height: "30px", fontWeight: "normal" }}
            reversed
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
