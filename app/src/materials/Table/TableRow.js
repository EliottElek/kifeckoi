import React from "react";
import Progress from "../Progress/Progress";
import Modal from "../Modal/Modal";
import Chip from "../Chip/Chip";
import "../../components/Client/RecentEvents/RecentEvents.css";
import AutoTextArea from "../AutoSizeTextArea/AutoSizeTextArea";
import ReactMarkdownSnippet from "../../assets/ReactMarkdown";
import shortString from "../../assets/functions/shortString";
import { Context } from "../../components/Context/Context";
const TableRow = ({ item }) => {
  const { markdown } = React.useContext(Context);
  const [openModal, setOpenModal] = React.useState(false);
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    if (item.status === "Réalisé") setStatus("action__green");
    else if (item.status === "En cours") setStatus("action__marron");
    else if (item.status === "Nouveau") setStatus("action__blue");
    else if (item.status === "À planifier") setStatus("action__orange");
  }, [item.status, setStatus]);
  if (!item) return <Progress />;
  const data = Object.keys(item).map(function (key) {
    if (key !== "__typename" && key !== "id" && key !== "name") return key;
    else return null;
  });
  return (
    <>
      <tr
        onClick={(e) => {
          e.stopPropagation();
          setOpenModal(true);
        }}
      >
        {data.map((it, i) => {
          if (it === "status")
            return (
              <td key={i}>
                <span className={"status"}>{item.status}</span>
              </td>
            );
          if (it === "contributors")
            return (
              <td key={i}>
                {item.contributors.length !== 0 ? (
                  <div style={{ display: "flex" }}>
                    {item.contributors.map((acc) => (
                      <Chip
                        key={acc.id}
                        text={acc.username}
                        src={acc.avatarUrl}
                      />
                    ))}
                  </div>
                ) : (
                  <span
                    style={{
                      fontStyle: "italic",
                      opacity: 0.5,
                      fontSize: "0.7rem",
                    }}
                  >
                    Non attribuée.
                  </span>
                )}
              </td>
            );
          if (it === "creation")
            return (
              <td key={i}>
                <span>
                  {new Date(item.creation).getDate()}
                  {"/"}
                  {new Date(item.creation).getMonth()}
                  {"/"}
                  {new Date(item.creation).getFullYear()}
                </span>
              </td>
            );
          if (it === "creator")
            return (
              <td key={i}>
                <span>
                  <Chip text={item.firstname} src={item.avatarUrl} />
                </span>
              </td>
            );
          return (
            <td key={i}>
              {markdown ? (
                <ReactMarkdownSnippet>
                  {shortString(item[it], 100)}
                </ReactMarkdownSnippet>
              ) : (
                <span>{shortString(item[it], 100)}</span>
              )}
            </td>
          );
        })}
      </tr>
      <Modal open={openModal} setOpen={setOpenModal}>
        <div className="modal__content__container">
          <AutoTextArea
            disabled
            className="modif__description__textarea"
            value={item.description}
            style={{
              width: "100%",
              fontSize: "2rem!important",
            }}
          />
          <span>
            Status : <span className={status}>{item.status}</span>
          </span>
          {item.contributors.length !== 0 && (
            <div className="kanban__section__content__name__container__avatars__container">
              <span>Responsables : </span>
              <div className="kanban__section__content__name__container__avatars__container">
                {item.contributors.map((acc) => (
                  <Chip key={acc.id} text={acc.username} src={acc.avatarUrl} />
                ))}
              </div>
            </div>
          )}
          <span>
            Créé le :{" "}
            <span>
              {new Date(item.creation).getDate()}
              {"/"}
              {new Date(item.creation).getMonth()}
              {"/"}
              {new Date(item.creation).getFullYear()}
              {" à "}
              {new Date(item.creation).getHours()}
              {":"}
              {new Date(item.creation).getMinutes()}
            </span>
          </span>
        </div>
      </Modal>
    </>
  );
};

export default TableRow;
