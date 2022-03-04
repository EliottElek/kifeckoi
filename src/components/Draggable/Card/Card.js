import "./card.scss";

const Card = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={props.className ? props.className : "card"}
    >
      {props.children}
    </div>
  );
};

export default Card;
