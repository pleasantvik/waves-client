import React from "react";
import { renderCardImage } from "utils/tools";
import classes from "./cartDetail.module.css";

export const CartDetail = ({ products, removeItem }) => {
  const renderItems = () =>
    products &&
    products.map((product, index) => (
      <div
        className={classes.user_product_block}
        key={`${product._id}${index}`}
      >
        <div className={classes.item}>
          <div
            className={classes.image}
            style={{
              background: `url(${renderCardImage(product.images)}) no-repeat`,
            }}
          ></div>
        </div>
        <div className={classes.item}>
          <h4>Product name</h4>
          <div>
            {product.brand.name} {product.model}
          </div>
        </div>
        <div className={classes.item}>
          <h4>Price</h4>
          <div>${product.price}</div>
        </div>
        <div className={`${classes.item} ${classes.btn}`}>
          <div
            className={classes.cart_remove_btn}
            onClick={() => removeItem(product._id)}
          >
            Remove
          </div>
        </div>
      </div>
    ));

  return <div>{renderItems()}</div>;
};
