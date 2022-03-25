import "./Avatar.css";
import avatar from "../../assets/images/profilePic.jpg";
const Avatar = ({ src, mini }) => {
  return (
    <img className={mini ? "avatar_mini" : "avatar"} src={avatar} alt="" />
  );
};

export default Avatar;
