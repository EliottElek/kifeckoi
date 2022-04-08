import "./Menu.scss";

const MenuItem = ({ children, active, onClick }) => {
  return (
    <li onClick={onClick} className={`menu-item ${active ? "active" : ""}`}>
      {children}
    </li>
  );
};

export default MenuItem;
