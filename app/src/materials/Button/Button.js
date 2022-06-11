import "./Button.scss";
const Button = ({
  children,
  reversed,
  style,
  onClick,
  disabled,
  type,
  props,
  className,
}) => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={[
        className,
        reversed ? `button__reversed` : `button__versed`,
      ].join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
