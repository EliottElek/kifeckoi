import React from "react";

const RenderHtml = ({ children }) => {
  return <div dangerouslySetInnerHTML={{ __html: children }} />;
};

export default RenderHtml;
