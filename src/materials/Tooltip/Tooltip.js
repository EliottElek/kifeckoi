import React from "react";
import "./Tooltip.css";
const Tooltip = ({ children, content }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className={`tooltip ${open ? "open" : "close"}`}>{content}</div>
      {children}
    </div>
  );
};

export default Tooltip;
