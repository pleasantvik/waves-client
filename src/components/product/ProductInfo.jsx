import {
  DoneOutline,
  LocalShipping,
  SentimentDissatisfied,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, selectCurrentUser } from "store/auth/authSlice";
import { AddToCart } from "utils/AddToCart";
import { showToast, WavesButton } from "utils/tools";
import classes from "./productInfo.module.css";

export const ProductInfo = ({ details }) => {
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

  const showProdTags = (detail) => (
    <div className={classes.products_tags}>
      <div className={classes.tag}>
        <div>
          <LocalShipping />
        </div>
        <div className={classes.tag_text}>
          {detail?.shipping && <div>Free shipping available</div>}
          {!detail?.shipping && <div>No shipping available</div>}
        </div>
      </div>
      {detail?.available > 0 && (
        <div className={classes.tag}>
          <div>
            <DoneOutline />
          </div>
          <div className={classes.tag_text}>
            <div>
              <strong>{detail.available}</strong>
            </div>
          </div>
        </div>
      )}
      {detail?.available < 0 && (
        <div className={classes.tag}>
          <div>
            <DoneOutline />
          </div>
          <div className={classes.tag_text}>
            <div>
              <strong>Sorry, the product is not available</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const showProdAction = (detail) => (
    <div className={classes.product_actions}>
      <div className={classes.price}>$ {detail.price}</div>
      <div className={classes.cart}>
        <WavesButton
          type="add_to_cart_link"
          runAction={() => handleAddToCart(detail)}
        />
      </div>
    </div>
  );

  const showProdSpec = (detail) => (
    <div className={classes.product_specifications}>
      <h2>Specs</h2>
      <div>
        <div className={classes.item}>
          <strong>frets:</strong> <span>{detail.frets}</span>
        </div>
        <div className={classes.item}>
          <strong>Wood:</strong> <span>{detail.woodtype}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1>
        {details.brand.name} {details.model}
      </h1>
      <p>{details.description}</p>
      {showProdTags(details)}
      {showProdAction(details)}
      {showProdSpec(details)}
      <WavesButton />
      <DoneOutline />
      <SentimentDissatisfied />
      <AddToCart
        modal={modal}
        errorType={errorType}
        handleClose={handleClose}
      />
    </div>
  );
};
