import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { Context } from "../Context/Context";
import Button from "../../materials/Button/Button";
import StickyNavbar from "../StickyNavbar/StickyNavbar";
import "./Project.css";
import Form from "./Form";
import Modal from "../../materials/Modal/Modal";
const Project = () => {
  const navigate = useNavigate();
  const { projects } = useContext(Context);
  const { id } = useParams();
  const project = projects.find((project) => project.id === id);
  const [openSaveModal, setOpenSaveModal] = React.useState(false);

  return (
    <div>
      <StickyNavbar>
        <div className="name__container">
          <Button onClick={() => navigate("/")}>
            <i className="gg-chevron-left"></i>Retour
          </Button>
          <h2> {project?.name}</h2>
        </div>
        <div className="actions__container">
          <Button reversed onClick={() => setOpenSaveModal(true)}>
            Enregistrer
          </Button>
          <Button>Valider</Button>
          <Button>Libérer</Button>
          <Button>Annuler</Button>
        </div>
      </StickyNavbar>
      <Form
        project={project}
        openSaveModal={openSaveModal}
        setOpenSaveModal={setOpenSaveModal}
      />
      <Modal open={openSaveModal} setOpen={setOpenSaveModal}>
        <div className="modal__content__container">
          <h3>Êtes-vous sûr(e) de vouloir valider ?</h3>
          <p>Tout changement est définitif.</p>
          <div className="modal__content__actions__container">
            <Button reversed onClick={() => setOpenSaveModal(false)}>
              Valider la sauvegarde
            </Button>
            <Button onClick={() => setOpenSaveModal(false)}>Annuler</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Project;
