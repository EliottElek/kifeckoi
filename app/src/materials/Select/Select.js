import React from "react";
import "./Select.scss";
const Select = ({
  children,
  defaultLabel,
  label,
  width,
  height,
  setIsActive,
  isActive,
  style,
  disabled,
}) => {
  const componentRef = React.useRef();

  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (componentRef && componentRef.current) {
        const ref = componentRef.current;
        if (!ref.contains(e.target) && isActive) {
          setIsActive(false);
        }
      }
    }
  }, [setIsActive, isActive]);
  return (
    <div
      className="select"
      style={{ ...style, width: width }}
      ref={componentRef}
    >
      <div
        style={{ height: height }}
        className={
          !disabled ? "select_button_label" : "select_button_label disabled"
        }
        onClick={(e) => {
          e.stopPropagation();
          !disabled && setIsActive(!isActive);
        }}
      >
        {label ? label : defaultLabel}
        {!isActive && !disabled ? (
          <i className="gg-chevron-down"></i>
        ) : (
          !disabled && <i className="gg-chevron-up"></i>
        )}
        {disabled && <i className="gg-chevron-down disabled"></i>}
      </div>
      {isActive && !disabled && (
        <div className="select_content">{children}</div>
      )}
    </div>
  );
};

export default Select;
