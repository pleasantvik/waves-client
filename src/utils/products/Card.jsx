import { renderCardImage, WavesButton } from "utils/tools";
import classes from "./card.module.css";

export const Card = (props) => {
  console.log(props.item.images, "PROPS");
  const handleAddToCart = (item) => {
    alert("add to cart");
  };

  return (
    <div
      className={`${classes.card__item__wrapper} ${
        props.grid ? classes.grid__bars : ""
      }`}
    >
      <div
        className={classes.card__item__wrapper__image}
        style={{
          background: `url(${renderCardImage(props.item.images)})`,
        }}
      ></div>
      <div className={classes.action_container}>
        <div className={classes.tags}>
          <div className={classes.brand}>
            {props?.item?.brand?.name || "Ivanes"}
          </div>
          <div className={classes.name}>{props.item.model}</div>
          <div className={classes.price}>{`$${props.item.price}`}</div>
        </div>
        {props.grid && (
          <div className={classes.description}>{props.item.description}</div>
        )}
        <div className={classes.actions}>
          <div className={classes.button_wrap}>
            <WavesButton
              type="default"
              altClass="card_link"
              title="View product"
              linkTo={`/product_detail/${props.item._id}`}
              style={{
                fontWeight: "bold",
              }}
            />
          </div>
          <div className={classes.button_wrap}>
            <WavesButton
              type="bag_link"
              runAction={() => handleAddToCart(props.item)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
