import "./Switch.scss";
const Switch = ({ onChange, defaultChecked }) => {
  return (
    <div className="toggle-theme-wrapper">
      <label className="toggle-theme" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          // 6
          onChange={onChange}
          defaultChecked={defaultChecked}
        />
        <div className="slider round"></div>
      </label>
    </div>
  );
};

export default Switch;
