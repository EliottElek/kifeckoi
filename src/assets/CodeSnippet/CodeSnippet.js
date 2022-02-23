import React from "react";
import "./CodeSnippet.css";
import Hlt from "react-highlight";
import Progress from "../../materials/Progress/Progress";
const CodeSnippet = ({ children, lang }) => {
  const [code, setCode] = React.useState("");
  React.useEffect(() => {
    fetch(children)
      .then((res) => res.text())
      .then((md) => {
        setCode(md);
      });
  });
  if (!code)
    return (
      <div className="loading-container">
        <Progress size="medium" />
      </div>
    );

  return (
    <div className="code-snippet-container">
      <Hlt
        language={lang}
        languages={["javascript", "typescript", "scss", "htmlbars", "bash"]}
      >
        {code || ""}
      </Hlt>
    </div>
  );
};

export default CodeSnippet;
