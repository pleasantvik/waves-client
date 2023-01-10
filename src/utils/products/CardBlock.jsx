import { Card } from "./Card";
import classes from "./cardBlock.module.css";

export const CardBlock = ({ shop, title, items, grid }) => {
  // console.log(items, "ITEMS");
  const renderCards = () => {
    return (
      items &&
      items.map((item) => <Card key={item._id} item={item} grid={grid} />)
    );
  };
  return (
    <div className={shop ? "card_block_shop" : "card_block"}>
      <div className={shop ? "" : "container"}>
        {title && <div className={classes.card__block__title}>{title}</div>}
        <div className={classes.card__gallery}>{renderCards()}</div>
      </div>
    </div>
  );
};
