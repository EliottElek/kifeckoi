import "./Button.scss";
const Button = ({
  children,
  reversed,
  style,
  onClick,
  disabled,
  type,
  props,
}) => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={
        reversed
          ? `button__reversed`
          : `button__versed`
      }
    >
      {children}
    </button>
  );
};

export default Button;
