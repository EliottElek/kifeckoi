import React, { useState } from "react";
import "./AdvancedNavBar.css";

const AdvancedNavBarItem = ({ children, icon }) => {
  const [open, setOpen] = useState(false);
  const componentRef = React.useRef();

  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (componentRef && componentRef.current) {
        const ref = componentRef.current;
        if (!ref.contains(e.target) && open) {
          setOpen(false);
        }
      }
    }
  }, [setOpen, open]);
  return (
    <li className={"advanced-navbar-item"} ref={componentRef}>
      <button className="advanced-navbar-button" onClick={() => setOpen(!open)}>
        {icon}
      </button>
      {open && children}
    </li>
  );
};

export default AdvancedNavBarItem;
