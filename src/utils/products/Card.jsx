import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, selectCurrentUser } from "store/auth/authSlice";
import { AddToCart } from "utils/AddToCart";
import { renderCardImage, showToast, WavesButton } from "utils/tools";
import classes from "./card.module.css";

export const Card = (props) => {
  const [modal, setModal] = useState(false);
  const [errorType, setErrorType] = useState(null);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const handleClose = () => setModal(false);
  console.log(user);
  const handleAddToCart = (item) => {
    console.log(item, "CART");
    if (!user) {
      setModal(true);
      setErrorType("no user");
      return false;
    }
    // alert("dispatch");
    dispatch(addCartItem(item));
    showToast("SUCCESS", "Item added successfully");
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
      <AddToCart
        modal={modal}
        errorType={errorType}
        handleClose={handleClose}
      />
    </div>
  );
};
