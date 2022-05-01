import React from "react";
import AutoCompleteUsers from "../../Draggable/AutoCompleteUsers";
import Modal from "../../../materials/Modal/Modal";
import { MdOutlineClear } from "react-icons/md";
import UserCard from "../../GlobalInfos/UserCard/UserCard";
import Button from "../../../materials/Button/Button";
import { useMutation } from "@apollo/client";
import { ADD_CONTRIBUTORS_TO_EVENT } from "../../../graphql/mutations";
import { toast } from "react-toastify";
const AddContributorsEvevent = ({
  event,
  open,
  setOpen,
  dataEvents,
  dataProject,
  alreadyExistingContributors,
}) => {
  const [selectedContributors, setSelectedContributors] = React.useState([]);

  const [addContributors] = useMutation(ADD_CONTRIBUTORS_TO_EVENT);
  const handleAddContributors = async (e) => {
    e.stopPropagation();
    try {
      let allContributors = [];
      if (alreadyExistingContributors) {
        allContributors =
          alreadyExistingContributors.concat(selectedContributors);
      } else {
        allContributors = selectedContributors;
      }
      const ArrayOfIds = allContributors.map((acc) => acc.id);

      await addContributors({
        variables: {
          eventId: event.id,
          contributors: ArrayOfIds,
        },
      });
      dataEvents.refetch();
      dataProject.refetch();
      setSelectedContributors([]);
      toast.success("Contributeurs ajoutés avec succès.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    } catch (err) {
      toast.error("Impossible d'ajouter les contributeurs.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
      console.log(err);
    }
    setOpen(false);
  };
  return (
    <Modal open={open}>
      <div className="modal__content__container">
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
            <UserCard
              eventMode
              event={event}
              dataEvents={dataEvents}
              usr={contributor}
              key={i}
            />
          ))}
          {selectedContributors?.map((contributor, i) => (
            <UserCard
              eventMode
              event={event}
              dataEvents={dataEvents}
              usr={contributor}
              key={i}
            />
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

export default AddContributorsEvevent;
