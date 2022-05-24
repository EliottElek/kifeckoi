import { useContext, useState } from "react";
import Avatar from "../../../materials/Avatar/Avatar";
import { Context } from "../../Context/Context";
import Button from "../../../materials/Button/Button";
import Modal from "../../../materials/Modal/Modal";
import Menu from "../../../materials/Menu/Menu";
import Popup from "../../../materials/Popup/Popup";
import MenuItem from "../../../materials/Menu/MenuItem";
import {
  ADD_CONTRIBUTORS_TO_PROJECT,
  ADD_CONTRIBUTORS_TO_EVENT,
} from "../../../graphql/mutations";
import { toast } from "react-toastify";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineClear } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router";
import "./UserCard.scss";
const UserCard = ({
  usr,
  dataProject,
  dataEvents,
  modal,
  eventMode,
  event,
}) => {
  const { currentProject, user } = useContext(Context);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [addContributors] = useMutation(ADD_CONTRIBUTORS_TO_PROJECT);
  const [addContributorsEvents] = useMutation(ADD_CONTRIBUTORS_TO_EVENT);

  const { id } = useParams();
  const handleDeleteContributor = async (e) => {
    e.stopPropagation();
    try {
      const allContributors = currentProject.contributors;
      const newContributors = allContributors.filter(
        (con) => con.id !== usr.id
      );
      const finalIds = newContributors.map((r) => r.id);
      if (eventMode)
        await addContributorsEvents({
          variables: {
            eventId: event.id,
            contributors: finalIds,
          },
        });
      else
        await addContributors({
          variables: {
            projectId: id,
            contributors: finalIds,
          },
        });
      dataEvents &&
        setTimeout(() => {
          dataEvents.refetch();
        }, 200);
      dataProject &&
        setTimeout(() => {
          dataProject.refetch();
        }, 200);
      toast.success("Contributeur supprimé avec succès.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
      setOpenDeleteModal(false);
    } catch (err) {
      toast.error("Impossible de supprimer les contributeurs.", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  return (
    <>
      <div className={"user__card"}>
        {/* <img src={usr.avatarUrl} className={"user__card__background"} alt="" /> */}
        <Avatar name={usr.username} large src={usr.avatarUrl} />
        <h5 className={"user__card__name"}>
          {usr.firstname + " " + usr.lastname}
        </h5>
        <h6 className={"user__card__username"}>({usr.username})</h6>
        <p className={"user__card__email"}>{usr.email}</p>
        {user.id !== usr.id && !modal && (
          <>
            <button onClick={setOpenPopUp} className="delete__user__button">
              <FiMoreHorizontal />
            </button>
            <Popup
              open={openPopUp}
              setOpen={setOpenPopUp}
              bottom
              style={{
                transform: "translate(70%, -60%)",
              }}
            >
              <Menu>
                {!eventMode && (
                  <MenuItem
                    onClick={(e) => {
                      setOpenPopUp(false);
                    }}
                  >
                    <p>Passer en administrateur</p>
                  </MenuItem>
                )}
                <MenuItem
                  onClick={(e) => {
                    setOpenDeleteModal(true);
                    setOpenPopUp(false);
                  }}
                >
                  <p>Supprimer</p>
                </MenuItem>
              </Menu>
            </Popup>
          </>
        )}
      </div>
      <Modal open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <div className="modal__content__container">
          <button
            data-tip
            data-for="closeTooltip"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDeleteModal(false);
            }}
            className="close__modal__button"
          >
            <MdOutlineClear />
          </button>
          <h3>Êtes-vous sûr de vouloir supprimer {usr.firstname} ?</h3>
          <p>Vous pourrez le rajouter à un autre moment. </p>
          <div className={"delete__actions__container"}>
            <Button reversed onClick={() => setOpenDeleteModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleDeleteContributor}>Supprimer</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserCard;
