import React from "react";
import { Context } from "../../Context/Context";
import "./Settings.scss";
import Switch from "../../../materials/Switch/Switch";
import Button from "../../../materials/Button/Button";
const Settings = () => {
  const { toggleTheme, setDark, defaultDark, dark } =
    React.useContext(Context);
  return (
    <div class={"settings__container"}>
      <h1>Paramètres</h1>
      <div className={"settings__container__spacer"} />
      <h3>Thème</h3>
      <div className={"settings__container__item"}>
        <span>
          Passer en mode
          {dark ? " jour ☀️" : " nuit 🌙"}
        </span>
        <Switch
          onChange={(e) => {
            toggleTheme(e);
            setDark(!dark);
          }}
          defaultChecked={defaultDark}
        />
      </div>
      <div className={"settings__container__item__space"}></div>
      <h3 className="danger__zone__title">Zone de danger</h3>
      <div className={"settings__container__item"}>
        <div className={"danger__zone__action__container"}>
          <Button
            style={{ height: "30px", backgroundColor: "var(--warning-color)" }}
          >
            Déconnexion
          </Button>
          <Button
            style={{
              height: "30px",
              backgroundColor: "rgba(241, 62, 62, 0.911)",
            }}
          >
            Supprimer le compte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
