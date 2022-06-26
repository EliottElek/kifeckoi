import React from "react";

const RenderHtml = ({ children, style }) => {
  return <div style={style} dangerouslySetInnerHTML={{ __html: children }} />;
};

export default RenderHtml;
