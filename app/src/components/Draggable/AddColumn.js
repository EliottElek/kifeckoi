import React from "react";
import { BiPlus } from "react-icons/bi";
import "./kanban.scss";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "../../materials/Button/Button";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    margin: "4px",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
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

const AddColumn = ({ setAddColumn }) => {
  const [add, setAdd] = React.useState(false);
  const [value, setValue] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    setAddColumn(value);
    setValue("");
    setAdd(false);
  };
  return (
    <form className={`kanban__section__add__col`} onSubmit={onSubmit}>
      {add ? (
        <div>
          <BootstrapInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="New column..."
            onBlur={() => setAdd(false)}
            autoFocus
          />
          <Button>Add</Button>
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
