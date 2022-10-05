import React from "react";
import Quill from "quill";
import "quill-mention";
import "quill/dist/quill.snow.css";
import Button from "../../materials/Button/Button";
import { GET_ALL_USERS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

export default function AutoTextArea({
  setModifMode,
  defaultValue,
  handleModifyDescription,
  placeholder,
  large,
}) {
  const [mentions, setMentions] = React.useState([]);
  const [quill, setQuill] = React.useState();
  const { data } = useQuery(GET_ALL_USERS);

  const wrapperRef = React.useCallback(
    (wrapper) => {
      async function suggestPeople(searchTerm) {
        const allPeople = data?.getAllUsers?.map((user) => {
          return { id: user.id, value: user.username };
        });
        return allPeople?.filter((person) => person.value.includes(searchTerm));
      }
      const modules = {
        mention: {
          allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
          mentionDenotationChars: ["@", "#"],
          source: async function (searchTerm, renderList) {
            const matchedPeople = await suggestPeople(searchTerm);
            renderList(matchedPeople);
          },
        },
        toolbar: false,
      };
      if (wrapper == null) return;

      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const q = new Quill(editor, {
        theme: "snow",
        modules: modules,
      });
      if (defaultValue) {
        const delta = q.clipboard.convert(defaultValue);
        q.setContents(delta, "silent");
      }
      if (placeholder) q.root.dataset.placeholder = placeholder;
      q.focus();
      q.setSelection(999999);
      setQuill(q);
    },
    [defaultValue, placeholder, data?.getAllUsers]
  );

  React.useEffect(() => {
    if (quill) {
      quill.getModule("mention").options.onSelect = (item, insertItem) => {
        setMentions([...mentions, item]);
        insertItem(item);
      };
    }
  }, [quill, mentions]);
  return (
    <div className="history__row__editor">
      <div ref={wrapperRef} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setModifMode(false);
          }}
          reversed
          style={{
            height: "28px",
            width: "90px",
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={(e) => {
            handleModifyDescription(e, quill, mentions);
            setModifMode(false);
          }}
          style={{
            height: "28px",
            width: "90px",
          }}
        >
          Valider
        </Button>
      </div>
    </div>
  );
}
