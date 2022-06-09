import React from "react";
import AutoCompleteUsers from "../Draggable/AutoCompleteUsers";
import Modal from "../../materials/Modal/Modal";
import { MdOutlineClear } from "react-icons/md";
import UserCard from "./UserCard/UserCard";
import Button from "../../materials/Button/Button";
import { useMutation } from "@apollo/client";
import { ADD_CONTRIBUTORS_TO_PROJECT } from "../../graphql/mutations";
import { useParams } from "react-router";
import { toast } from "react-toastify";
const AddContributorsModal = ({
  open,
  setOpen,
  dataProject,
  alreadyExistingContributors,
}) => {
  const [selectedContributors, setSelectedContributors] = React.useState([]);
  const [addContributors] = useMutation(ADD_CONTRIBUTORS_TO_PROJECT);
  const { id } = useParams();
  const handleAddContributors = async () => {
    try {
      const ArrayOfIds = selectedContributors.map((acc) => acc.id);

      await addContributors({
        variables: {
          projectId: id,
          contributors: ArrayOfIds,
        },
      });
      setTimeout(() => {
        dataProject.refetch();
      }, 200);
      setOpen(false);
      toast.success("Contributeurs ajoutés avec succès.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    } catch (err) {
      toast.error("Impossible d'ajouter les contributeurs.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="modal__content__container" style={{ width: "95%" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          className="close__modal__button"
        >
          <MdOutlineClear />
        </button>
        <h2
          className="title__global"
          style={{ marginTop: "30px", marginBottom: "20px" }}
        >
          Sélectionnez des contributeurs
        </h2>
        <AutoCompleteUsers
          multi
          placeholder="Cherchez un contributeur..."
          alreadyExistingContributors={alreadyExistingContributors}
          setSelectedContributors={setSelectedContributors}
        />
        <div className={"user__cards__container"} style={{ marginTop: "30px" }}>
          {alreadyExistingContributors?.map((contributor, i) => (
            <UserCard modal usr={contributor} key={i} />
          ))}
          {selectedContributors?.map((contributor, i) => (
            <UserCard modal usr={contributor} key={i} />
          ))}
        </div>
        <div className="add__contributors__actions__container">
          <Button reversed onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleAddContributors}>Ajouter</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddContributorsModal;
