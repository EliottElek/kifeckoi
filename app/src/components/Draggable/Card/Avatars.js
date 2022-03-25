import Avatar from "../../../materials/Avatar/Avatar";
const Avatars = ({ users }) => {
  return (
    <span className="kanban__section__content__name__container">
      {users.length !== 0 && (
        <span className="kanban__section__content__name__container__avatars__container">
          {users.map((user, i) => {
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
      )}
    </span>
  );
};

export default Avatars;
