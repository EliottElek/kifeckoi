import "./Button.scss";
const Button = ({
  children,
  reversed,
  style,
  onClick,
  disabled,
  type,
  className,
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
          ? `button__reversed ${className}`
          : `button__versed ${className}`
      }
    >
      {children}
    </button>
  );
};

export default Button;
