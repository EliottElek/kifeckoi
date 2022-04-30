import { lazy, Suspense } from "react";
import Progress from "../../materials/Progress/Progress";
import "./AccountPage.scss";
import Settings from "./Settings/Settings";
const HeroAvatarCard = lazy(() => import("./HeroAvatarCard/HeroAvatarCard"));

const renderLoader = () => <Progress size="medium" reversed />;
const AccountPage = () => {
  return (
    <div className="account__page__container">
      <Suspense fallback={renderLoader()}>
        <HeroAvatarCard />
      </Suspense>
      <Suspense fallback={renderLoader()}>
        <Settings />
      </Suspense>
    </div>
  );
};

export default AccountPage;
