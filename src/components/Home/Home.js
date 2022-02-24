import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/Context";
import Button from "../../materials/Button/Button";
const Home = () => {
  const { projects } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home KIFECKOI</h1>
      {projects?.map((project) => (
        <Button onClick={() => navigate(`/project/${project.id}`)}>
          {project?.name}
        </Button>
      ))}
    </div>
  );
};

export default Home;
