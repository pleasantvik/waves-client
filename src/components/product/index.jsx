import LoadingSpinner from "components/reuseable/Spinner";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "store/apiSlice";
import { renderCardImage } from "utils/tools";

import classes from "./product.module.css";
import { ProductInfo } from "./ProductInfo";

export const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductQuery(id);

  console.log(product);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <div className={classes.page_container}>
        <div className={classes.page_top}>
          <div className="container">Product detail</div>
        </div>
        <div className="container">
          {product?.data?.product && (
            <div className={classes.product_detail_wrapper}>
              <div className={classes.left}>
                <div>
                  <img
                    src={renderCardImage(product?.data?.product?.images)}
                    alt=""
                    onClick={() => alert("Add")}
                  />
                </div>
              </div>
              <div className={classes.right}>
                <ProductInfo details={product?.data?.product} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
