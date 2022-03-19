import "./Avatar.css";
const Avatar = ({ src, mini }) => {
  return (
    <img className={mini ? "avatar_mini" : "avatar"} src={src} alt="avatar" />
  );
};

export default Avatar;
