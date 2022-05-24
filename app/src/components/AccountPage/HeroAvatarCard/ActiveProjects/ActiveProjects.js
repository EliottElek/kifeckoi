import React from "react";
import { Context } from "../../../Context/Context";
import "./ActiveProjects.scss";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router";
const ActiveProjects = () => {
  const { user } = React.useContext(Context);
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: "40px" }}>
      <h3>{user?.projects?.length} projets actifs</h3>
      <div className={"active__projects__container"}>
        {user?.projects?.map((project, i) => (
          <div
            key={i}
            className={"active__projects__container__item"}
            onClick={() => navigate(`/project/${project.id}/global`)}
          >
            <span>{project?.name}</span>
            <FaChevronRight />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveProjects;
