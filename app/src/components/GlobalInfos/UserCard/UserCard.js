import React, { useContext, useState } from "react";
import Avatar from "../../../materials/Avatar/Avatar";
import { Context } from "../../Context/Context";
import Button from "../../../materials/Button/Button";
import Modal from "../../../materials/Modal/Modal";
import { Menu, MenuItem } from "@mui/material";
import {
  REMOVE_CONTRIBUTORS,
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
  const { user, currentProject } = useContext(Context);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [removeContributors] = useMutation(REMOVE_CONTRIBUTORS);
  const [addContributorsEvents] = useMutation(ADD_CONTRIBUTORS_TO_EVENT);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopUp = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { id } = useParams();
  const handleDeleteContributor = async (e) => {
    e.stopPropagation();
    try {
      if (eventMode)
        await addContributorsEvents({
          variables: {
            eventId: event.id,
            contributors: usr.id,
          },
        });
      else
        await removeContributors({
          variables: {
            projectId: id,
            contributors: usr.id,
          },
        });
      if (user.id === usr.id) window.location.href = "/";
      else {
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
      }
    } catch (err) {
      toast.error(
        "Une erreur est survenue. Vous essayez peut-être de supprimer le créateur de ce projet.",
        {
          position: toast.POSITION.BOTTOM_LEFT,
          pauseOnHover: false,
        }
      );
      console.log(err.message);
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
        {currentProject?.creator?.id !== usr.id && !modal && (
          <button onClick={handleClick} className="delete__user__button">
            <FiMoreHorizontal />
          </button>
        )}
      </div>
      <Modal open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <div className="modal__content__container" style={{ width: "95%" }}>
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
          {user.id === usr.id ? (
            <>
              <h3>
                {user.firstname}, êtes-vous sûr de vouloir quitter ce projet ?
              </h3>
              <p>
                Vous devrez attendre qu'un administrateur vous ajoute pour
                collaborer à nouveau.
              </p>
            </>
          ) : (
            <>
              <h3>Êtes-vous sûr de vouloir supprimer {usr.firstname} ?</h3>
              <p>Vous pourrez le rajouter à un autre moment. </p>
            </>
          )}
          <div className={"delete__actions__container"}>
            <Button reversed onClick={() => setOpenDeleteModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleDeleteContributor}>
              {user.id === usr.id ? "Quitter" : "Supprimer"}
            </Button>
          </div>
        </div>
      </Modal>
      <Menu
        anchorEl={anchorEl}
        open={openPopUp}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        <MenuItem
          onClick={(e) => {
            setAnchorEl(null);
          }}
        >
          <p>Passer en administrateur</p>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setOpenDeleteModal(true);
            setAnchorEl(null);
          }}
        >
          {user.id === usr.id ? <p>Quitter ce projet</p> : <p>Supprimer</p>}
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserCard;
