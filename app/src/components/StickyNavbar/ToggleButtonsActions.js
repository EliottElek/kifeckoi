import * as React from "react";
import { styled } from "@mui/material/styles";
import GridViewIcon from "@mui/icons-material/GridView";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu } from "@mui/material";
import { backgrounds } from "./bgs";
import { MenuItem, IconButton, Button } from "@mui/material";
import { Box } from "@mui/system";
import SettingsIcon from "@mui/icons-material/Settings";
import Modal from "../../materials/Modal/Modal";
import { MdOutlineClear } from "react-icons/md";
import ButtonClean from "../../materials/Button/Button";
import { useUpdateEventsSchemaBg } from "../../hooks/mutations/project/eventsSchema";
import { Context } from "../Context/Context";
import { useParams } from "react-router";
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    height: "40px",
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "var(--font-color)",
    backgroundColor: "var(--toggle-background)",
  },
  margin: theme.spacing(0.5),
  height: "40px",
}));

export default function CustomizedDividers(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, currentProject, dataProject } = React.useContext(Context);
  const alignment = searchParams.get("display") || "kanban";
  const updateEventsSchemaBg = useUpdateEventsSchemaBg();
  const handleAlignment = (event, newAlignment) => {
    props.setAddCard(false);
    setSearchParams("display=" + newAlignment);
  };
  const { schema } = useParams();

  const [anchorElFilter, setAnchorElFilter] = React.useState(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);
  const [openModalCustom, setOpenModalCustom] = React.useState(false);
  const [bg, setBg] = React.useState({});
  const openFilter = Boolean(anchorElFilter);
  const openSettings = Boolean(anchorElSettings);

  const handleClickFilter = (event) => {
    setAnchorElFilter(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorElFilter(null);
  };
  const handleClickSettings = (event) => {
    setAnchorElSettings(event.currentTarget);
  };
  const handleCloseSettings = () => {
    setAnchorElSettings(null);
  };
  const onClose = () => {
    setOpenModalCustom(false);
  };
  const handlePreview = (bg) => {
    setBg(bg);
    const back = document.getElementById("custom__bg");
    if (bg.type === "image")
      back.style.background = `url(${bg.url}) no-repeat center center / cover`;
    else back.style.background = bg.hex;
  };
  const handleSubmitNewBg = async () => {
    const EventsSchema = currentProject?.eventsSchema.find(
      (e) => e.title.toLowerCase() === schema
    );
    try {
      await updateEventsSchemaBg({
        variables: {
          userId: user.id,
          schemaId: EventsSchema.id,
          backgroundUrl:
            bg.type === "image"
              ? `url(${bg.url}) no-repeat center center / cover`
              : bg.hex,
        },
      });
      toast.success("Le fond a bien été modifié.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      dataProject.refetch();
      setOpenModalCustom(false);
    } catch (err) {
      toast.error("Impossibe de changer le fond.", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };
  return (
    <Box sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}>
      <StyledToggleButtonGroup
        size="small"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <StyledToggleButton value="list" disableRipple>
          <FormatListBulletedIcon style={{ color: "var(--font-color)" }} />
        </StyledToggleButton>
        <StyledToggleButton value="kanban" disableRipple>
          <GridViewIcon style={{ color: "var(--font-color)" }} />
        </StyledToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <Button
        onClick={handleClickFilter}
        style={{ border: "none" }}
        disableRipple
      >
        <FilterAltIcon style={{ color: "var(--font-color)" }} />
        <p style={{ fontSize: "0.6rem", color: "var(--font-color)" }}>
          Filtrer
        </p>
        <ArrowDropDownIcon style={{ color: "var(--font-color)" }} />
      </Button>
      <IconButton
        onClick={handleClickSettings}
        sx={{ height: "40px" }}
        disableRipple
      >
        <SettingsIcon style={{ color: "var(--font-color)" }} />
      </IconButton>
      <Menu
        anchorEl={anchorElFilter}
        open={openFilter}
        onClose={handleCloseFilter}
        sx={{
          margin: "0.5rem",
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        <MenuItem
          disableRipple
          style={{ fontSize: "0.9rem" }}
          onClick={(e) => {}}
        >
          Afficher les évènements créés cette semaine
        </MenuItem>
        <MenuItem
          disableRipple
          style={{ fontSize: "0.9rem" }}
          onClick={() => {}}
        >
          Afficher les évènements créés la semaine dernière
        </MenuItem>
        <MenuItem disableRipple style={{ fontSize: "0.9rem" }}>
          Afficher les évènements en status à vérifier
        </MenuItem>
        <MenuItem disableRipple style={{ fontSize: "0.9rem" }}>
          Afficher les évènements en status vérifié
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorElSettings}
        open={openSettings}
        onClose={handleCloseSettings}
        sx={{
          margin: "0.5rem",
          "& .MuiPaper-root": {
            color: "var(--font-color)",
            bgcolor: "var(--card-background)",
          },
        }}
      >
        <MenuItem
          disableRipple
          style={{ fontSize: "0.9rem" }}
          onClick={() => {
            handleCloseSettings();
            setOpenModalCustom(true);
          }}
        >
          Ajouter un fond personnalisé
        </MenuItem>
      </Menu>
      <Modal open={openModalCustom} onClose={onClose}>
        <div className="modal__content__container" style={{ width: "95%" }}>
          <button
            onClick={() => {
              onClose();
            }}
            className="close__modal__button"
          >
            <MdOutlineClear />
          </button>
          <div
            style={{
              overflowX: "auto",
              maxWidth: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            }}
          >
            {backgrounds.map((bgItem) => (
              <div
                onClick={() => handlePreview(bgItem)}
                style={{
                  cursor: "pointer",
                  margin: "6px",
                }}
              >
                {bgItem.type === "image" ? (
                  <img
                    style={{
                      borderRadius: "4px",
                      border: "solid 1px var(--border-color)",
                      objectFit: "cover",
                      cursor: "pointer",
                      height: "200px",
                    }}
                    alt=""
                    src={bgItem.url}
                  />
                ) : (
                  <div
                    style={{
                      background: bgItem.hex,
                      borderRadius: "4px",
                      border: "solid 1px var(--border-color)",
                      height: "200px",
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              gap: "6px",
            }}
          >
            <ButtonClean reversed onClick={onClose}>
              Annuler
            </ButtonClean>
            <ButtonClean onClick={handleSubmitNewBg}>Valider</ButtonClean>
          </div>
        </div>
      </Modal>
    </Box>
  );
}
