import React from "react";
import "./Progress.scss";

const Progress = ({ size, reversed, style }) => {
  return (
    <div
      style={style}
      className={`loader-${size} ${reversed && "reversed"}`}
    ></div>
  );
};

export default Progress;
