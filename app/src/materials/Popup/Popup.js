import React from "react";
import "./Popup.css";
const Popup = ({ children, open, setOpen }) => {
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
    <div ref={componentRef} className={`popup ${open ? "open" : "close"}`}>
      {children}
    </div>
  );
};

export default Popup;
