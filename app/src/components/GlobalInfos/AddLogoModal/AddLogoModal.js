import React from "react";
import Modal from "../../../materials/Modal/Modal";
import { MODIFY_PROJECT_GLOBAL_INFOS } from "../../../graphql/mutations";
import { toast } from "react-toastify";
import { Context } from "../../Context/Context";
import { useMutation } from "@apollo/client";
import "../ChangeNameModal/ChangeNameModal.scss";
import Button from "../../../materials/Button/Button";
const AddLogoModal = ({ open, setOpen, dataProject }) => {
  const { currentProject } = React.useContext(Context);
  const [modifyProjectInfos] = useMutation(MODIFY_PROJECT_GLOBAL_INFOS);
  const [url, setUrl] = React.useState(currentProject.logoUrl);

  const handleChangeLogo = async () => {
    try {
      await modifyProjectInfos({
        variables: {
          projectId: currentProject.id,
          globalStatus: currentProject.globalStatus,
          perimeterStatus: currentProject.perimeterStatus,
          planningStatus: currentProject.planningStatus,
          goLiveDate: currentProject.goLiveDate,
          goCopyDate: currentProject.goCopyDate,
          globalDescription: currentProject.globalDescription,
          perimeterDescription: currentProject.perimeterDescription,
          planningDescription: currentProject.planningDescription,
          logoUrl: url,
        },
      });
      dataProject.refetch();
      setOpen(false);
      toast.success(`Logo modifié avec succès.`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    } catch (err) {
      toast.error(`Impossible de changer le logo.`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="modal__add">
        <input
          autoFocus
          className="name__input"
          value={url}
          placeholder={`Ajoutez un logo au format url...`}
          onChange={(e) => setUrl(e.target.value)}
        />{" "}
        <div className="add__modal__actions">
          <Button
            style={{ height: "30px" }}
            reversed
            onClick={() => setOpen(false)}
          >
            Annuler
          </Button>
          <Button style={{ height: "30px" }} onClick={handleChangeLogo}>
            Valider
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddLogoModal;
