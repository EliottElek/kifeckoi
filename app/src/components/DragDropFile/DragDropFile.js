import { useRef, useState } from "react";
import "./drop.scss";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ClearIcon from "@mui/icons-material/Clear";
import { useDropzone } from "react-dropzone";
import Button from "../../materials/Button/Button";
import { toast } from "react-toastify";
const DropFileInput = (props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    onDrop: (acceptedFiles) => {
      setFileList(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
      props.onFileChange(acceptedFiles);
    },
    onDropRejected: () => {
      setFileList([]);
      toast.error(`Le fichier doit être au format .csv`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    },
  });
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");
  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const previewedFile = Object.assign(newFile, {
        preview: URL.createObjectURL(newFile),
      });
      const updatedList = [...fileList, previewedFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <div className="drop__container">
      <p>{props.header}</p>
      <p>Les évènements doivent respecter le schéma suivant : </p>
      <ul>
        <li>id : chaîne de caractères ou vide</li>
        <li>
          type : "Action", "Info", "Décision", "Risque", "Livrable", "Problème"
        </li>
        <li>description : chaîne de caractères</li>
        <li>
          status :"Nouveau", "En cours", " À planifier", "Réalisé", "Décalage
          date"
        </li>
        <li>période : chaîne de caractères ou vide</li>
        <li>state : "Vérifié", "À vérifier" ou vide</li>
      </ul>
      {fileList.length === 0 && (
        <div
          ref={wrapperRef}
          className="drop-file-input"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          {...getRootProps()}
        >
          <UploadFileIcon style={{ fontSize: "4rem" }} />

          <div className="drop-file-input__label">
            <p>Glissez & Déposez votre ficher ici</p>
          </div>
          <input
            {...getInputProps()}
            type="file"
            value=""
            onChange={onFileDrop}
          />
        </div>
      )}
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <h2 align="center">Prêt à téléverser ! </h2>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <div className="drop-file-preview__item__info">
                <p>
                  {item.name} - {item.size} Bytes
                </p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                <ClearIcon />
              </span>
            </div>
          ))}
          <Button
            onClick={() => {
              props.onFileSubmit();
              props.setOpenModal(false);
            }}
            variant="contained"
          >
            Téléverser
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default DropFileInput;
