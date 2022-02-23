import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";
const Modal = ({ children, open, setOpen }) => {
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

  React.useEffect(() => {
    if (!open) {
      document.documentElement.style.overflow = "auto"; // firefox, chrome
      document.body.scroll = "yes"; // ie only
    } else {
      document.documentElement.style.overflow = "hidden"; // firefox, chrome
      document.body.scroll = "no"; // ie only
    }
  }, [open]);
  if (!open) return null;
  return (
    <>
      <Backdrop />
      <div ref={componentRef} className="modal">
        {children}
      </div>
    </>
  );
};

export default Modal;
