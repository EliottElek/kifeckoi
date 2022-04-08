import "./InputText.scss";
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
      <input
        onClick={(e) => {
          e.stopPropagation();
        }}
        type={type}
        disabled={disabled}
        className={disabled ? "input__text disabled__input" : "input__text"}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        style={style}
      />
    </div>
  );
};

export default InputText;
