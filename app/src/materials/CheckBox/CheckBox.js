import "./CheckBox.scss";
const CheckBox = ({
  children,
  checked,
  onClick,
  setChecked,
  style,
  rounded,
}) => {
  const BasicCheckBox = () => {
    return (
      <div
        style={style}
        className="checkbox_container"
        onClick={(e) => {
          onClick && onClick();
          e.stopPropagation();
          setChecked(!checked);
        }}
      >
        <div className="checkbox">
          {checked && (
            <div className="checkbox_inner">
              <i className="gg-check"></i>
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    );
  };
  const RoundedCheckBox = () => {
    return (
      <div
        style={style}
        className="checkbox_container_rounded"
        onClick={() => setChecked(!checked)}
      >
        <div className="checkbox_rounded">
          {checked && <div className="checkbox_inner_rounded"></div>}
        </div>
        <div>{children}</div>
      </div>
    );
  };
  if (rounded) return <RoundedCheckBox />;
  return <BasicCheckBox />;
};

export default CheckBox;
