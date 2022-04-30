import React from "react";
import { Context } from "../../Context/Context";
import { MODIFY_PROJECT_GLOBAL_INFOS } from "../../../graphql/mutations";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { DayPicker } from "react-day-picker";
import Button from "../../../materials/Button/Button";
import "react-day-picker/dist/style.css";
import { FiEdit2 } from "react-icons/fi";
import "./DatePicker.scss";
import fr from "date-fns/locale/fr";
import Backdrop from "../../../materials/Backdrop/Backdrop";
import formatDate from "../../../assets/functions/formatDate";

const DatePicker = ({ type, dataProject }) => {
  const { currentProject } = React.useContext(Context);
  const [modifyProjectInfos] = useMutation(MODIFY_PROJECT_GLOBAL_INFOS);
  const [selected, setSelected] = React.useState("");

  React.useEffect(() => {
    setSelected(
      type === "Go live"
        ? new Date(currentProject.goLiveDate)
        : new Date(currentProject.goCopyDate)
    );
  }, [currentProject.goCopyDate, currentProject.goLiveDate, type, setSelected]);
  const [modifMode, setModifMode] = React.useState(false);
  const handleChangeDate = async (e) => {
    try {
      await modifyProjectInfos({
        variables: {
          projectId: currentProject.id,
          globalStatus: currentProject.globalStatus,
          perimeterStatus: currentProject.perimeterStatus,
          planningStatus: currentProject.planningStatus,
          goLiveDate: type === "Go live" ? selected : currentProject.goLiveDate,
          goCopyDate: type === "Go copy" ? selected : currentProject.goCopyDate,
          globalDescription: currentProject.globalDescription,
          perimeterDescription: currentProject.perimeterDescription,
          planningDescription: currentProject.planningDescription,
          logoUrl: currentProject.logoUrl,
        },
      });
      dataProject.refetch();
      setModifMode(false);
      toast.success(`date de ${type} modifiée avec succès.`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    } catch (err) {
      toast.error(`impossible de changer la date de ${type}`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  if (type === "Go live" && currentProject.goLiveDate === "")
    return (
      <div>
        <Button
          onClick={() => setModifMode(true)}
          reversed
          style={{ height: "30px", marginLeft: "-20px" }}
        >
          Ajouter une date de Go live
        </Button>
        {modifMode && (
          <Backdrop>
            <div className="date__picker__form">
              <DayPicker
                locale={fr}
                style={{
                  background: "var(--card-background)",
                  borderRadius: "8px",
                  maxWidth: "300px",
                }}
                mode="single"
                selected={selected}
                onSelect={setSelected}
              />
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  margin: "4px",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={() => setModifMode(false)}
                  reversed
                  style={{ height: "30px" }}
                >
                  Annuler
                </Button>
                <Button style={{ height: "30px" }} onClick={handleChangeDate}>
                  Valider
                </Button>
              </div>
            </div>
          </Backdrop>
        )}
      </div>
    );
  if (type === "Go copy" && currentProject.goCopyDate === "")
    return (
      <div>
        <Button
          onClick={() => setModifMode(true)}
          reversed
          style={{ height: "30px", marginLeft: "-20px" }}
        >
          Ajouter une date de Go copy
        </Button>
        {modifMode && (
          <Backdrop>
            <div className="date__picker__form">
              <DayPicker
                locale={fr}
                style={{
                  background: "var(--card-background)",
                  borderRadius: "8px",
                  maxWidth: "300px",
                }}
                mode="single"
                selected={selected}
                onSelect={setSelected}
              />
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  margin: "4px",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={() => setModifMode(false)}
                  reversed
                  style={{ height: "30px" }}
                >
                  Annuler
                </Button>
                <Button style={{ height: "30px" }} onClick={handleChangeDate}>
                  Valider
                </Button>
              </div>
            </div>
          </Backdrop>
        )}
      </div>
    );
  return (
    <>
      <h4 className={"date__picker__container"}>
        {type === "Go live" ? "Go live le " : "Go copy le "}
        <span className="date__span" onClick={() => setModifMode(true)}>
          {type === "Go live"
            ? formatDate(currentProject.goLiveDate)
            : formatDate(currentProject.goCopyDate)}
        </span>
        <span className="edit__icon">
          <FiEdit2 />
        </span>
      </h4>
      {modifMode && (
        <Backdrop onClick={() => setModifMode(false)}>
          <div
            className="date__picker__form"
            onClick={(e) => e.stopPropagation()}
          >
            <DayPicker
              locale={fr}
              style={{
                background: "var(--card-background)",
                borderRadius: "8px",
                maxWidth: "300px",
              }}
              mode="single"
              selected={selected}
              onSelect={setSelected}
            />
            <div
              style={{
                display: "flex",
                gap: "4px",
                margin: "4px",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => setModifMode(false)}
                reversed
                style={{ height: "30px" }}
              >
                Annuler
              </Button>
              <Button style={{ height: "30px" }} onClick={handleChangeDate}>
                Valider
              </Button>
            </div>
          </div>
        </Backdrop>
      )}
    </>
  );
};

export default DatePicker;
