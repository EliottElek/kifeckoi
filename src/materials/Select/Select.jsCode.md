import React from "react";
import "./Select.css";
const Select = ({
  children,
  defaultLabel,
  label,
  width,
  height,
  setIsActive,
  isActive,
  style,
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
        className="select_button_label"
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        {label ? label : defaultLabel}{" "}
        {!isActive ? (
          <i className="gg-chevron-down"></i>
        ) : (
          <i className="gg-chevron-up"></i>
        )}
      </div>
      {isActive && <div className="select_content">{children}</div>}
    </div>
  );
};

export default Select;
