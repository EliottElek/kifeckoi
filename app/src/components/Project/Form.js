import React from "react";
import Drawer from "../../materials/Drawer/Drawer";
import InputText from "../../materials/InputText/InputText";
import Select from "../../materials/Select/Select";
import SelectItem from "../../materials/Select/SelectItem/SelectItem";
import List from "../../materials/List/List";
import ListItem from "../../materials/List/ListItem";
import DecisionsV2 from "./DecisionsV2";
import InfosV2 from "./InfosV2";
// import Livrables from "./Livrables";
import RisksV2 from "./RisksV2";
import ProblemsV2 from "./ProblemsV2";

import { useLocation } from "react-router-dom";
import { Context } from "../Context/Context";
import ActionsV2 from "./ActionsV2";

const statusOptions = [
  { name: "Conforme" },
  { name: "Vigilance" },
  { name: "À risque" },
  { name: "Alerte" },
  { name: "Issue" },
  { name: "Gestion de crise" },
];
const navElements = [
  { id: "actions", name: "Actions" },
  { id: "infos", name: "Infos" },
  { id: "decisions", name: "Décisions" },
  { id: "risques", name: "Risques" },
  { id: "problemes", name: "Problèmes" },
  { id: "livrables", name: "Livrables" },
];
const Form = () => {
  const { user } = React.useContext(Context);

  const [descriptionGlobal, setDescriptionGlobal] = React.useState("");
  const [descriptionPlanning, setDescriptionPlanning] = React.useState("");
  const [descriptionPerimetre, setDescriptionPerimetre] = React.useState("");
  const [descriptionMoyens, setDescriptionMoyens] = React.useState("");

  const [goLive] = React.useState("");
  const [goCop] = React.useState("");

  const [selectedStatusOption, setSelectedStatusOption] = React.useState();
  const [selectedStatusOption2, setSelectedStatusOption2] = React.useState();
  const [selectedStatusOption3, setSelectedStatusOption3] = React.useState();
  const [selectedStatusOption4, setSelectedStatusOption4] = React.useState();

  const [isActiveStatus, setIsActiveStatus] = React.useState(false);
  const [isActiveStatus2, setIsActiveStatus2] = React.useState(false);
  const [isActiveStatus3, setIsActiveStatus3] = React.useState(false);
  const [isActiveStatus4, setIsActiveStatus4] = React.useState(false);

  const MainContent = () => {
    return (
      <>
        <div className="form__container">
          <div className="form__line__container">
            <div className="form__line__label__container">
              <p>Statut global du projet*</p>
              <Select
                defaultLabel={selectedStatusOption}
                style={{ margin: "4px" }}
                label={selectedStatusOption?.name || "Non indiqué"}
                width={200}
                height={10}
                isActive={isActiveStatus}
                setIsActive={setIsActiveStatus}
              >
                {statusOptions.map((item, i) => (
                  <SelectItem
                    key={i}
                    onClick={() => {
                      setSelectedStatusOption(item);
                      setIsActiveStatus(false);
                    }}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <textarea
              onInput={() => {
                this.style.height = "";
                this.style.height = this.scrollHeight + "px";
              }}
              disabled={user.admin ? false : true}
              onClick={(e) => e.stopPropagation()}
              className="form__textarea large__textarea"
              value={descriptionGlobal}
              onChange={(e) => setDescriptionGlobal(e.target.value)}
              placeholder={"Statut global du projet..."}
            />
          </div>
          <div className="form__line__container">
            <div className="form__line__label__container">
              <p>Statut planning*</p>
              <Select
                defaultLabel={selectedStatusOption2}
                style={{ margin: "4px" }}
                label={selectedStatusOption2?.name || "Non indiqué"}
                width={200}
                height={10}
                isActive={isActiveStatus2}
                setIsActive={setIsActiveStatus2}
              >
                {statusOptions.map((item, i) => (
                  <SelectItem
                    key={i}
                    onClick={() => {
                      setSelectedStatusOption2(item);
                      setIsActiveStatus2(false);
                    }}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <textarea
              onInput={() => {
                this.style.height = "";
                this.style.height = this.scrollHeight + "px";
              }}
              disabled={user.admin ? false : true}
              onClick={(e) => e.stopPropagation()}
              className="form__textarea"
              value={descriptionPlanning}
              onChange={(e) => setDescriptionPlanning(e.target.value)}
              placeholder={"Description statut planning..."}
            />
          </div>
          <div className="form__line__container">
            <div className="form__line__label__container">
              <p>Statut périmètre*</p>
              <Select
                defaultLabel={selectedStatusOption3}
                style={{ margin: "4px" }}
                label={selectedStatusOption3?.name || "Non indiqué"}
                width={200}
                height={10}
                isActive={isActiveStatus3}
                setIsActive={setIsActiveStatus3}
              >
                {statusOptions.map((item, i) => (
                  <SelectItem
                    key={i}
                    onClick={() => {
                      setSelectedStatusOption3(item);
                      setIsActiveStatus3(false);
                    }}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <textarea
              onInput={() => {
                this.style.height = "";
                this.style.height = this.scrollHeight + "px";
              }}
              disabled={user.admin ? false : true}
              onClick={(e) => e.stopPropagation()}
              className="form__textarea"
              value={descriptionPerimetre}
              onChange={(e) => setDescriptionPerimetre(e.target.value)}
              placeholder={"Description statut périmètre..."}
            />
          </div>
          <div className="form__line__container">
            <div className="form__line__label__container">
              <p>Statut moyens*</p>
              <Select
                defaultLabel={selectedStatusOption4}
                style={{ margin: "4px" }}
                label={selectedStatusOption4?.name || "Non indiqué"}
                width={200}
                height={10}
                isActive={isActiveStatus4}
                setIsActive={setIsActiveStatus4}
              >
                {statusOptions.map((item, i) => (
                  <SelectItem
                    key={i}
                    onClick={() => {
                      setSelectedStatusOption4(item);
                      setIsActiveStatus4(false);
                    }}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <textarea
              onInput={() => {
                this.style.height = "";
                this.style.height = this.scrollHeight + "px";
              }}
              disabled={user.admin ? false : true}
              onClick={(e) => e.stopPropagation()}
              className="form__textarea"
              value={descriptionMoyens}
              onChange={(e) => setDescriptionMoyens(e.target.value)}
              placeholder={"Description statut moyens..."}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <InputText
              label={"Date de Go Live : "}
              style={{
                margin: "0px",
                width: "auto!important",
                minWidth: "100px!important",
              }}
              value={goLive}
              disabled
            />
            <InputText
              label={"Date de Go Cop : "}
              style={{
                margin: "0px",
                width: "auto!important",
                minWidth: "100px!important",
              }}
              value={goCop}
              disabled
            />
          </div>
        </div>
        <ActionsV2 />
        <InfosV2 />
        <DecisionsV2 />
        <RisksV2 />
        <ProblemsV2 />
        {/* <Livrables /> */}
      </>
    );
  };
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
        <a
          href={`#${comp?.id}`}
          style={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          {comp?.name} <i className="gg-chevron-right"></i>
        </a>
      </ListItem>
    );
  };
  const Navigation = () => {
    return (
      <div className="sticky__side__nav">
        <h2 className="sticky__side__nav__title">Sommaire</h2>
        <List>
          {navElements.map((comp, i) => (
            <NavItem key={i} comp={comp} id={comp.id} />
          ))}
        </List>
      </div>
    );
  };
  return (
    <Drawer
      mainContent={MainContent()}
      secondaryContent={Navigation()}
      drawerWidth={240}
      breakPoint={800}
    />
  );
};

export default Form;
