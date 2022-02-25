import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/Context";
import Button from "../../materials/Button/Button";
const Home = () => {
  const { projects } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", marginTop: "120px" }}>
      {projects?.map((project, i) => (
        <Button key={i} onClick={() => navigate(`/project/${project.id}`)}>
          {project?.name}
        </Button>
      ))}
    </div>
  );
};

export default Home;
