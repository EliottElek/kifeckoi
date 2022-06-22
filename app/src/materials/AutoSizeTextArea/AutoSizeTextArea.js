import { useState, useEffect, useRef } from "react";
const onEscape = function (action) {
  window &&
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        action();
      }
    });
};
const AutoTextArea = (props) => {
  const textAreaRef = useRef(null);
  const [text, setText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");

  onEscape(() => {
    textAreaRef?.current?.blur();
  });
  useEffect(() => {
    if (textAreaRef) setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
  }, [text]);

  const onChangeHandler = (event) => {
    setTextAreaHeight("auto");
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setText(event.target.value);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div
      style={{
        minHeight: parentHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      <textarea
        onFocus={(e) => {
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          );
        }}
        {...props}
        ref={textAreaRef}
        rows={1}
        style={{
          ...props.style,
          margin: 0,
          height: textAreaHeight,
        }}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default AutoTextArea;
