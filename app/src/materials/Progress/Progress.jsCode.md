
import React from "react";
import "./Progress.css";

const Progress = ({ size, reversed }) => {
  return <div className={`loader-${size} ${reversed && "reversed"}`}></div>;
};

export default Progress;

