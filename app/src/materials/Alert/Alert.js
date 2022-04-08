import React from "react";
import "./Alert.scss";
const Alert = ({ open, setOpen, children, type, delay }) => {
  const [show, setShow] = React.useState(false);
  const delayTime = delay || 2000;

  React.useEffect(() => {
    open && setShow(true);
  }, [open]);
  React.useEffect(() => {
    const closeAlert = () => {
      setTimeout(() => {
        setOpen(false);
      }, delayTime);
      setTimeout(() => {
        setShow(false);
      }, delayTime + 100);
    };
    closeAlert();
  }, [delayTime, setOpen]);
  if (type === "warning" && show)
    return (
      <div
        className={`alert__container ${
          open ? "open_alert" : "closed_alert"
        } warning`}
      >
        {children}
        <button
          className={"clear_icon"}
          onClick={() => {
            setOpen(false);
            setTimeout(() => {
              setShow(false);
            }, 100);
          }}
        >
          <i className="gg-close"></i>
        </button>
      </div>
    );
  else if (show)
    return (
      <div
        className={`alert__container ${open ? "open_alert" : "closed_alert"}`}
      >
        {children}
        <button
          className={"clear_icon"}
          onClick={() => {
            setOpen(false);
            setTimeout(() => {
              setShow(false);
            }, 100);
          }}
        >
          <i className="gg-close"></i>
        </button>
      </div>
    );
  return null;
};

export default Alert;
