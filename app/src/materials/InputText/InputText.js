import "./InputText.scss";
import { alpha, styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";
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
    padding: "16px 12px",
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
const InputText = ({
  value,
  className,
  onChange,
  placeHolder,
  label,
  style,
  number,
  max,
  type,
  min,
  disabled,
}) => {
  if (number)
    return (
      <div className="input__text__container">
        <p className="input__text__label">{label}</p>
        <input
          disabled={disabled}
          type="number"
          max={max}
          min={min}
          className={
            disabled
              ? `input__text disabled__input ${className}`
              : `nput__text ${className}`
          }
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
          style={style}
        />
      </div>
    );
  return (
    <div className="input__text__container">
      <p className="input__text__label">{label}</p>
      <BootstrapInput
        onClick={(e) => {
          e.stopPropagation();
        }}
        type={type}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        style={style}
      />
    </div>
  );
};

export default InputText;
