import Avatar from "../../../materials/Avatar/Avatar";
import "./Avatars.css";
const Avatars = ({ users }) => {
  if (users?.length === 0) return null;
  if (users.length > 3) {
    const toNotShow = users.length - 2;
    return (
      <span className="kanban__section__content__name__container">
        <span className="kanban__section__content__name__container__avatars__container">
          <div className={"persons__left__indicator default_avatar"}>
            +{toNotShow}
          </div>
          {users?.map((user, i) => {
            return user.avatarUrl && i < 2 ? (
              <div
                key={i}
                className={
                  i === users.length - 1 ? "first_avatar" : "default_avatar"
                }
              >
                <Avatar name={user.firstname} mini src={user.avatarUrl} />
              </div>
            ) : (
              i < 2 && (
                <div
                  key={i}
                  className={
                    i === users.length - 1 ? "first_avatar" : "default_avatar"
                  }
                >
                  <img
                    className="kanban__section__content__name__container__img"
                    alt=""
                    src={require("../../../assets/images/defaultAvatar.webp")}
                  />
                </div>
              )
            );
          })}
        </span>
      </span>
    );
  }
  return (
    <span className="kanban__section__content__name__container">
      <span className="kanban__section__content__name__container__avatars__container">
        {users?.map((user, i) => {
          return user.avatarUrl ? (
            <div
              key={i}
              className={
                i === users.length - 1 ? "first_avatar" : "default_avatar"
              }
            >
              <Avatar mini src={user.avatarUrl} />
            </div>
          ) : (
            <div
              key={i}
              className={
                i === users.length - 1 ? "first_avatar" : "default_avatar"
              }
            >
              <img
                className="kanban__section__content__name__container__img"
                alt=""
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              />
            </div>
          );
        })}
      </span>
    </span>
  );
};

export default Avatars;
