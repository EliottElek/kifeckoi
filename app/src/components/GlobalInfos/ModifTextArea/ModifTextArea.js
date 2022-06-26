import React from "react";
import { Context } from "../../Context/Context";
import "./ModifTextArea.scss";
import { MODIFY_PROJECT_GLOBAL_INFOS } from "../../../graphql/mutations";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import Button from "../../../materials/Button/Button";
import TextEditor from "../../TextEditor/TextEditor";
const ModifTextArea = ({ type, dataProject }) => {
  const { currentProject } = React.useContext(Context);
  const [modifMode, setModifMode] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [modifyProjectInfos] = useMutation(MODIFY_PROJECT_GLOBAL_INFOS);

  React.useEffect(() => {
    if (type === "global") setInput(currentProject.globalDescription);
    else if (type === "planning") setInput(currentProject.planningDescription);
    else setInput(currentProject.perimeterDescription);
  }, [
    type,
    setInput,
    currentProject.globalDescription,
    currentProject.planningDescription,
    currentProject.perimeterDescription,
  ]);

  const handleModifyDescription = async (e, input) => {
    e.stopPropagation();
    try {
      await modifyProjectInfos({
        variables: {
          projectId: currentProject.id,
          globalStatus: currentProject.globalStatus,
          perimeterStatus: currentProject.perimeterStatus,
          planningStatus: currentProject.planningStatus,
          goLiveDate: currentProject.goLiveDate,
          goCopyDate: currentProject.goCopyDate,
          logoUrl: currentProject.logoUrl,
          globalDescription:
            type === "global"
              ? input.root.innerHTML
              : currentProject.globalDescription,
          perimeterDescription:
            type === "perimètre"
              ? input.root.innerHTML
              : currentProject.perimeterDescription,
          planningDescription:
            type === "planning"
              ? input.root.innerHTML
              : currentProject.planningDescription,
        },
      });
      dataProject.refetch();
      toast.success(`description du status ${type} modifiée avec succès.`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
      setModifMode(false);
    } catch (err) {
      toast.error(`impossible de modifier la description du status ${type}`, {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnHover: false,
      });
    }
  };
  if (modifMode)
    return (
      <div>
        <TextEditor
          defaultValue={input}
          setModifMode={setModifMode}
          handleModifyDescription={handleModifyDescription}
          placeholder={`Description du status ${type}...`}
        />
      </div>
    );
  else
    return (
      <>
        {input !== "<p><br></p>" ? (
          <div
            onClick={() => setModifMode(true)}
            className="modif__textarea__paragraph"
          >
            {type === "global" && (
              <div
                dangerouslySetInnerHTML={{
                  __html: currentProject.globalDescription,
                }}
              ></div>
            )}
            {type === "planning" && (
              <div
                dangerouslySetInnerHTML={{
                  __html: currentProject.planningDescription,
                }}
              ></div>
            )}
            {type === "perimètre" && (
              <div
                dangerouslySetInnerHTML={{
                  __html: currentProject.perimeterDescription,
                }}
              ></div>
            )}
          </div>
        ) : (
          <p style={{ fontStyle: "italic" }}>
            Vous pouvez ajouter une description au status {type}.{" "}
            <Button
              reversed
              onClick={() => setModifMode(true)}
              style={{ height: "30px" }}
            >
              Ajouter une description
            </Button>
          </p>
        )}
      </>
    );
};

export default ModifTextArea;
