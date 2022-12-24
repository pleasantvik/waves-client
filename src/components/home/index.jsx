import { Fragment } from "react";
import { Featured } from "components/home/Featured";
import { SlimBlock } from "utils/promotions/SlimBlock";
// import { useQuery } from "@tanstack/react-query";
// import { getProductsBySort } from "services/api";
// import { useDispatch, useSelector } from "react-redux";
// import { productAction } from "store/productSlice";
import { useGetProductsQuery } from "store/apiSlice";
import { CardBlock } from "utils/products/CardBlock";
import LoadingSpinner from "components/reuseable/Spinner";

const slimPromotion = {
  img: "/images/featured/featured_home.jpg",
  title: "Up to 40%",
  subtitle: "In second hand guitar",
  linkTitle: "Shop Now",
  linkTo: "/shop",
};

export const Home = () => {
  const { data: orderSold, isLoading: bySoldLoading } = useGetProductsQuery({
    limit: 4,
    sort: "itemSold",
  });
  const { data: orderDate, isLoading: byDateLoading } = useGetProductsQuery({
    limit: 4,
    sort: "-date",
  });

  console.log(orderSold?.data?.data, "prod");
  console.log(orderDate?.data?.data, "prodDate");
  return (
    <Fragment>
      <Featured />
      {orderSold && (
        <CardBlock items={orderSold?.data?.data} title="Best selling guitars" />
      )}
      {bySoldLoading && <LoadingSpinner />}
      <SlimBlock items={slimPromotion} />
      {orderDate && (
        <CardBlock
          items={orderDate?.data?.data}
          title="Latest guitars on the shop"
        />
      )}
      {byDateLoading && <LoadingSpinner />}
    </Fragment>
  );
};
