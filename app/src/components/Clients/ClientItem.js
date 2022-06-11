import "./Clients.scss";
import GridItem from "../Grid/GridItem";
import Avatars from "../Draggable/Card/Avatars";
import logo from "../../assets/images/logo.png";
import formatDate from "../../assets/functions/formatDate";
import AvatarFromLetter from "../../utils/AvatarFromLetter";
const ClientItem = ({ client }) => {

  return (
    <GridItem to={`/client/${client.id}`} className={"client__item"}>
      <div className={"client__card__header"}>
        <img src={client.avatarUrl ? client.avatarUrl : logo} alt="" />
      </div>
      <div className="middle__image">
        {client.avatarUrl ? (
          <img alt="" src={client.avatarUrl} />
        ) : (
          <AvatarFromLetter text={client.name} />
        )}
      </div>
      <div className="client__card__avatars__container">
        <div className="client__card__avatars__container__title">
          <h3>{client.name}</h3>
          <p>{formatDate(client.creation, true)}</p>
        </div>
        <Avatars users={client?.contributors} />
      </div>
    </GridItem>
  );
};

export default ClientItem;
