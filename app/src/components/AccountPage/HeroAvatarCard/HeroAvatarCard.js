import React, { lazy, Suspense } from "react";
import { Context } from "../../Context/Context";
import "./HeroAvatarCard.scss";
import Progress from "../../../materials/Progress/Progress";
import Button from "../../../materials/Button/Button";
const ActiveProjects = lazy(() => import("./ActiveProjects/ActiveProjects"));
const renderLoader = () => <Progress size="medium" reversed />;

const HeroAvatarCard = () => {
  const { user } = React.useContext(Context);
  return (
    <div className={"hero__avatar__card__container"}>
      <div className={"hero__avatar__card__container__main"}>
        <div className={"hero__avatar__card__container__main__infos"}>
          <h1>{user?.firstname + " " + user?.lastname}</h1>
          <h2>{user?.username}</h2>
          <h4>{user?.email}</h4>
          <Button style={{ height: "35px", marginTop: "20px" }}>
            Modifier
          </Button>
        </div>
        <img
          className={"hero__avatar__card__container__main__avatar"}
          src={user?.avatarUrl}
          alt=""
        />
      </div>
      <Suspense fallback={renderLoader()}>
        <ActiveProjects />
      </Suspense>
    </div>
  );
};

export default HeroAvatarCard;
