import React from "react";
import InputText from "../../materials/InputText/InputText";
import Select from "../../materials/Select/Select";
import SelectItem from "../../materials/Select/SelectItem/SelectItem";

const clientOptions = [];
const projectOptions = [];
const projectManagerOptions = [
  {
    name: "Paul Moquin",
  },
  {
    name: "Eliott Morcillo",
  },
];
const periodOptions = [
  {
    name: "Y22W04",
  },
  {
    name: "Y22W05",
  },
  {
    name: "Y22W06",
  },
  {
    name: "Y22W07",
  },
];
const statusOptions = [
  { name: "Conforme" },
  { name: "Vigilance" },
  { name: "À risque" },
  { name: "Alerte" },
  { name: "Issue" },
  { name: "Gestion de crise" },
];

const Form = ({ project }) => {
  const [selectedProjectManagerOption, setSelectedProjectManagerOption] =
    React.useState();
  const [selectedPeriodOption, setSelectedPeriodOption] = React.useState();
  const [selectedStatusOption, setSelectedStatusOption] = React.useState();
  const [selectedStatusOption2, setSelectedStatusOption2] = React.useState();
  const [selectedStatusOption3, setSelectedStatusOption3] = React.useState();
  const [selectedStatusOption4, setSelectedStatusOption4] = React.useState();

  const [isActivePeriod, setIsActivePeriod] = React.useState(false);
  const [isActiveManager, setIsActiveManager] = React.useState(false);
  const [isActiveStatus, setIsActiveStatus] = React.useState(false);
  const [isActiveStatus2, setIsActiveStatus2] = React.useState(false);
  const [isActiveStatus3, setIsActiveStatus3] = React.useState(false);
  const [isActiveStatus4, setIsActiveStatus4] = React.useState(false);

  return (
    <div className="form__container">
      <div className="form__line__container">
        <Select
          disabled
          defaultLabel="Client*"
          style={{ margin: "4px" }}
          width={200}
          height={10}
        >
          {clientOptions.map((item, i) => (
            <SelectItem key={i}>{item}</SelectItem>
          ))}
        </Select>
        <Select
          disabled
          defaultLabel={project ? project.name : "Projet*"}
          style={{ margin: "4px" }}
          width={200}
          height={10}
        >
          {projectOptions.map((item, i) => (
            <SelectItem key={i}>{item}</SelectItem>
          ))}
        </Select>
        <Select
          defaultLabel="Chef de projet*"
          style={{ margin: "4px" }}
          label={selectedProjectManagerOption?.name}
          width={200}
          height={10}
          isActive={isActiveManager}
          setIsActive={setIsActiveManager}
        >
          {projectManagerOptions.map((item, i) => (
            <SelectItem
              key={i}
              onClick={() => {
                setSelectedProjectManagerOption(item);
                setIsActiveManager(false);
              }}
            >
              {item.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          defaultLabel="Période*"
          style={{ margin: "4px" }}
          label={selectedPeriodOption?.name}
          width={200}
          height={10}
          isActive={isActivePeriod}
          setIsActive={setIsActivePeriod}
        >
          {periodOptions.map((item, i) => (
            <SelectItem
              key={i}
              onClick={() => {
                setSelectedPeriodOption(item);
                setIsActivePeriod(false);
              }}
            >
              {item.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="form__line__container">
        <div className="form__line__label__container">
          <p>Statut global du projet*</p>
          <Select
            defaultLabel={statusOptions[0].name}
            style={{ margin: "4px" }}
            label={selectedStatusOption?.name}
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
          className="form__textarea large__textarea"
          placeholder={"Statut global du projet..."}
        />
      </div>
      <div className="form__line__container">
        <div className="form__line__label__container">
          <p>Statut planning*</p>
          <Select
            defaultLabel={statusOptions[0].name}
            style={{ margin: "4px" }}
            label={selectedStatusOption2?.name}
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
          className="form__textarea"
          placeholder={"Statut global du projet..."}
        />
      </div>
      <div className="form__line__container">
        <div className="form__line__label__container">
          <p>Statut périmètre*</p>
          <Select
            defaultLabel={statusOptions[0].name}
            style={{ margin: "4px" }}
            label={selectedStatusOption3?.name}
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
          className="form__textarea"
          placeholder={"Statut global du projet..."}
        />
      </div>
      <div className="form__line__container">
        <div className="form__line__label__container">
          <p>Statut moyens*</p>
          <Select
            defaultLabel={statusOptions[0].name}
            style={{ margin: "4px" }}
            label={selectedStatusOption4?.name}
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
                  setIsActiveStatus2(false);
                }}
              >
                {item.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <textarea
          className="form__textarea"
          placeholder={"Statut global du projet..."}
        />
      </div>
      <div className="form__line__container">
        <div className="form__line__label__container">
          <p>Date de Go live : </p>
          <InputText style={{ margin: 0 }} value={project.goLive} disabled />
        </div>
        <div className="form__line__container__void" />
      </div>
    </div>
  );
};

export default Form;
