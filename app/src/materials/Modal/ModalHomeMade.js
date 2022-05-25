import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";
const Modal = ({ children, open, setOpen, style }) => {
  const componentRef = React.useRef();

  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (componentRef && componentRef.current) {
        const ref = componentRef.current;
        if (!ref.contains(e.target) && open) {
          setOpen && setOpen(false);
        }
      }
    }
  }, [setOpen, open]);
  if (!open) return null;
  return (
    <>
      <Backdrop onClick={() => setOpen && setOpen(false)} />
      <div
        onClick={(e) => e.stopPropagation()}
        style={style}
        ref={componentRef}
        className="modal"
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
