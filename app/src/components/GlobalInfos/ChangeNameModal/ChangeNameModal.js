import React from "react";
import AutoTextArea from "../../../materials/AutoSizeTextArea/AutoSizeTextArea";
import Modal from "../../../materials/Modal/Modal";
import { MODIFY_PROJECT_NAME } from "../../../graphql/mutations";
import { toast } from "react-toastify";
import { Context } from "../../Context/Context";
import { useMutation } from "@apollo/client";
import Button from "../../../materials/Button/Button";
import "./ChangeNameModal.scss";
const ChangeNameModal = ({ open, setOpen, dataProject }) => {
  const { currentProject } = React.useContext(Context);
  const [modifyProjectName] = useMutation(MODIFY_PROJECT_NAME);
  const [name, setName] = React.useState("");
  React.useEffect(() => {
    setName(currentProject.name);
  }, [currentProject.name, setName]);
  const handleChangeName = async () => {
    if (name === "") return;
    const old = currentProject.name;
    try {
      await modifyProjectName({
        variables: {
          projectId: currentProject.id,
          name: name,
        },
      });
      dataProject.refetch();
      setOpen(false);
      toast.success(`"${old}" s'appelle désormais "${name}".`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    } catch (err) {
      toast.error(`Impossible de changer le nom.`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="modal__content__container space-between">
        <AutoTextArea
          autoFocus
          className="modif__textarea big__title__textarea"
          value={name}
          placeholder={`Le nom du projet ne peut pas être vide...`}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <div style={{ display: "flex", gap: "6px", justifySelf: "flex-end" }}>
          <Button
            style={{ height: "30px" }}
            reversed
            onClick={() => setOpen(false)}
          >
            Annuler
          </Button>
          <Button style={{ height: "30px" }} onClick={handleChangeName}>
            Valider
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeNameModal;
