import styles from "./Card.module.scss";

const Card = ({ children, cardClass }) => {
  return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
};
//testing commit
export default Card;