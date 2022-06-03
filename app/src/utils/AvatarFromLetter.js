import React from "react";

const AvatarFromLetter = ({ text }) => {
  const firstLetter = text[0];
  return (
    <span
      style={{
        height: "80px",
        width: "80px",
        display: "flex",
        borderRadius: "50%",
        margin: "8px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-background-2)",
        fontSize: "2.4rem",
        fontWeight: "500",
      }}
    >
      {firstLetter}
    </span>
  );
};

export default AvatarFromLetter;
