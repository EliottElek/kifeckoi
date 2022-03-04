import React from "react";
import Select from "../../materials/Select/Select";
import SelectItem from "../../materials/Select/SelectItem/SelectItem";
import Button from "../../materials/Button/Button";
import MiniAccordion from "../../materials/MiniAcordion/MiniAccordion";
import Modal from "../../materials/Modal/Modal";

const statusOptions = [
  { name: "Conforme" },
  { name: "Vigilance" },
  { name: "À risque" },
  { name: "Alerte" },
  { name: "Issue" },
  { name: "Gestion de crise" },
];

const Action = ({ action, removeAction, i }) => {
  const [actionSelected, setActionSelected] = React.useState();
  const [isActiveAction, setIsActiveAction] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [responsable, setResponsable] = React.useState("");

  const HeaderContent = () => {
    return (
      <>
        <h4> {i + 1} </h4>
        <div className="form__line__container" style={{ padding: "10px" }}>
          <Select
            defaultLabel={statusOptions[0].name}
            style={{ margin: "4px" }}
            label={actionSelected?.name}
            width={200}
            height={10}
            isActive={isActiveAction}
            setIsActive={setIsActiveAction}
          >
            {statusOptions.map((item, i) => (
              <SelectItem
                key={i}
                onClick={() => {
                  setActionSelected(item);
                  setIsActiveAction(false);
                }}
              >
                {item.name}
              </SelectItem>
            ))}
          </Select>
            <textarea
              onClick={(e) => e.stopPropagation()}
              className="form__textarea"
              spellCheck="false"
              placeholder={"Déscription de l'item..."}
            />
            <textarea
              onClick={(e) => e.stopPropagation()}
              className="form__textarea"
              placeholder={"Commentaire..."}
            />
          <div className="text__container">
            <p>Date limite : </p>
            <p>22/02/2022</p>
          </div>
            <textarea
              onClick={(e) => e.stopPropagation()}
              className="form__textarea"
              spellCheck="false"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              placeholder={"Nom responsable..."}
            />
          <Button
            onClick={() => {
              setOpenDelete(true);
            }}
            style={{
              width: "40px!important",
              minWidth: "0px!important",
              padding: "none",
              height: "40px!important",
              borderRadius: "50%",
            }}
          >
            <i className="gg-trash"></i>
          </Button>
          <Modal open={openDelete} setOpen={setOpenDelete}>
            <div className="modal__content__container">
              <h3>Action {i + 1}</h3>
              <p>Êtes-vous sûr(e) de vouloir supprimer cette action ?</p>
              <div style={{ display: "flex", gap: "12px" }}>
                <Button
                  reversed
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAction(action);
                    setOpenDelete(false);
                  }}
                >
                  Supprimer
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDelete(false);
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </>
    );
  };
  const Content = () => {
    return (
      <>
        <div
          className="form__line__container"
          style={{ padding: "0px", alignItems: "center" }}
        >
          <textarea
            spellCheck="false"
            onClick={(e) => e.stopPropagation()}
            className="form__textarea"
            placeholder={"Période 1..."}
          />
          <textarea
            onClick={(e) => e.stopPropagation()}
            className="form__textarea"
            placeholder={"Commentaires pour la période..."}
          />
          <div className="text__container">
            <p>22/02/2022</p>
          </div>
          <textarea
            disabled
            onClick={(e) => e.stopPropagation()}
            className="form__textarea"
            value={responsable}
          />
        </div>
        <div
          className="form__line__container"
          style={{ padding: "0px", alignItems: "center" }}
        >
          <textarea
            spellCheck="false"
            onClick={(e) => e.stopPropagation()}
            className="form__textarea"
            placeholder={"Période 2..."}
          />
          <textarea
            onClick={(e) => e.stopPropagation()}
            className="form__textarea"
            placeholder={"Commentaires pour la période..."}
          />
          <div className="text__container">
            <p>22/02/2022</p>
          </div>
          <textarea
            disabled
            onClick={(e) => e.stopPropagation()}
            className="form__textarea"
            value={responsable}
          />
        </div>
        <div
          className="form__line__container"
          style={{ padding: "0px", alignItems: "center" }}
        >
          <textarea
            spellCheck="false"
            onClick={(e) => e.stopPropagation()}
            className="form__textarea"
            placeholder={"Période 3..."}
          />
          <textarea
            onClick={(e) => e.stopPropagation()}
            className="form__textarea"
            placeholder={"Commentaires pour la période..."}
          />
          <div className="text__container">
            <p>22/02/2022</p>
          </div>
          <textarea
            disabled
            onClick={(e) => e.stopPropagation()}
            className="form__textarea"
            value={responsable}
          />
        </div>
      </>
    );
  };

  return (
    <MiniAccordion id={"actions"} content={Content()} title={HeaderContent()} />
  );
};
export default Action;
