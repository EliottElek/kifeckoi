import "./StickyNavbar.css";
const StickyNavbar = ({ children, style }) => {
  return (
    <div style={style} className="stickynavbar__container">
      {children}
    </div>
  );
};

export default StickyNavbar;
