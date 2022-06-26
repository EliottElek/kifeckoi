import React from "react";
import { useNavigate, useParams } from "react-router";
import "./Cards.scss";
import { useGetEventsTypesCount } from "../../../hooks/queries/project";
import AddIcon from "@mui/icons-material/Add";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "../../../materials/Button/Button";
import { useCreateNewEventsSchema } from "../../../hooks/mutations/project";
import { Context } from "../../Context/Context";
import { toast } from "react-toastify";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    margin: "4px",
    borderRadius: 4,
    position: "relative",
    backgroundColor: "var(--card-background)",
    color: "var(--font-color)",
    border: "1px solid #ced4da",
    fontSize: 16,
    display: "flex",
    flexGrow: 1,
    padding: "6px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
const Card = ({ children, onClick, pointer, bg }) => {
  return (
    <div
      onClick={onClick}
      className="cards__container__global__card"
      style={{ cursor: pointer ? "pointer" : "default", background: bg }}
    >
      {children}
    </div>
  );
};

const Cards = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, refetch } = useGetEventsTypesCount({
    variables: { projectId: id },
  });
  const AddCard = () => {
    const [add, setAdd] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const { id } = useParams();
    const { dataProject, user } = React.useContext(Context);
    const createNewEventsSchema = useCreateNewEventsSchema();
    const onNewSchemaSubmit = async (e) => {
      e.preventDefault();
      try {
        await createNewEventsSchema({
          variables: {
            userId: user.id,
            projectId: id,
            title: title,
          },
        });

        refetch();
        dataProject.refetch();
        toast.success("Nouveau type ajouté avec succès.", {
          position: toast.POSITION.BOTTOM_LEFT,
          pauseOnHover: false,
        });
      } catch (err) {
        toast.error("Imposible d'ajouter le type.", {
          position: toast.POSITION.BOTTOM_LEFT,
          pauseOnHover: false,
        });
      }
    };
    return (
      <Card pointer onClick={() => setAdd(true)}>
        {add ? (
          <form
            className="cards__container__global__card"
            onSubmit={onNewSchemaSubmit}
          >
            <BootstrapInput
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New type..."
              onBlur={() => setAdd(false)}
            />
            <Button style={{ width: "95%" }} onClick={onNewSchemaSubmit}>
              Add
            </Button>
          </form>
        ) : (
          <div
            className="cards__container__global__card"
            style={{ width: "100%" }}
          >
            <span className="cards__container__global__card__title">Add</span>
            <span className="cards__container__global__card__number">
              <AddIcon fontSize="3rem" />
            </span>
          </div>
        )}
      </Card>
    );
  };
  return (
    <div className="cards__container__global">
      {data?.getEventsTypesCount?.map((type) => (
        <Card
          onClick={() => navigate(`/project/${id}/${type.title.toLowerCase()}`)}
          pointer
          bg={type.backgroundUrl}
        >
          <span className="cards__container__global__card__title">
            {type.title}
          </span>
          <span className="cards__container__global__card__number">
            {type?.count}
          </span>
        </Card>
      ))}
      <AddCard />
    </div>
  );
};

export default Cards;
