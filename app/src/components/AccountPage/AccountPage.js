import { lazy, Suspense } from "react";
import Progress from "../../materials/Progress/Progress";
import "./AccountPage.scss";
const Banner = lazy(() => import("./Banner"));

const renderLoader = () => <Progress size="medium" reversed />;
const AccountPage = () => {
  return (
    <div className="account__page__container">
      <div className="level__two__header">
        <h1 className={"client__projects__container__title"}>Profil</h1>
      </div>
      <Suspense fallback={renderLoader()}>
        <Banner />
      </Suspense>
    </div>
  );
};

export default AccountPage;
