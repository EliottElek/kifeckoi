import React from "react";
import "./Tooltip.scss";
const Tooltip = ({ children, content, delay }) => {
  const [open, setOpen] = React.useState(false);

  const setDelay = () => {
    const time = delay ? delay * 100 : 400;
    setTimeout(() => {
      setOpen(true);
    }, time);
  };
  return (
    <div onMouseEnter={setDelay} onMouseLeave={() => setOpen(false)}>
      {open && (
        <div className={`tooltip ${open ? "open" : "close"}`}>{content}</div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
