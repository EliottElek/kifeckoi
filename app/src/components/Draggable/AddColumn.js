import React from "react";
import { BiPlus } from "react-icons/bi";
import "./kanban.scss";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "../../materials/Button/Button";
import { Context } from "../Context/Context";
import { useParams } from "react-router";
import { useCreateNewEventsStatus } from "../../hooks/mutations/project";
import { toast } from "react-toastify";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    margin: "4px",
    borderRadius: 4,
    position: "relative",
    backgroundColor: "var(--card-background)",
    color: "var(--font-color)",
    border: "1px solid #ced4da",
    fontSize: 16,
    display: "flex",
    flexGrow: 1,
    padding: "6px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const AddColumn = () => {
  const [add, setAdd] = React.useState(false);
  const { schema } = useParams();
  const [value, setValue] = React.useState("");
  const { currentProject, user, dataEvents } = React.useContext(Context);
  const createNewEventsStatus = useCreateNewEventsStatus();
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const schemaFound = currentProject.eventsSchema.find(
        (e) => e.title.toLowerCase() === schema
      );
      await createNewEventsStatus({
        variables: {
          userId: user.id,
          projectId: currentProject.id,
          title: value,
          schemaId: schemaFound.id,
        },
      });
      setValue("");
      setAdd(false);
      dataEvents.refetch();
      toast.success(`Une colonne "${value}" vient d'être ajoutée à ${schema}`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    } catch (err) {
      console.log(err);
      toast.error(`Impossible de créer la nouvelle colonne.`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  return (
    <form className={`kanban__section__add__col`} onSubmit={onSubmit}>
      {add ? (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <BootstrapInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="New column..."
            onBlur={() => setAdd(false)}
            autoFocus
          />
          <Button onClick={onSubmit}>Add</Button>
        </div>
      ) : (
        <button
          onClick={() => setAdd(true)}
          className={`kanban__section__title__button`}
        >
          <BiPlus /> New column
        </button>
      )}
    </form>
  );
};

export default AddColumn;
