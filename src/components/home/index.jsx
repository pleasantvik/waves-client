import { Fragment, useEffect } from "react";
import { Featured } from "components/home/Featured";
import { SlimBlock } from "utils/promotions/SlimBlock";
import { useQuery } from "@tanstack/react-query";
import { getProductsBySort } from "serices/api";
import { useDispatch } from "react-redux";
import { productAction } from "store/productSlice";

const slimPromotion = {
  img: "/images/featured/featured_home.jpg",
  title: "Up to 40%",
  subtitle: "In second hand guitar",
  linkTitle: "Shop Now",
  linkTo: "/shop",
};

export const Home = () => {
  const dispatch = useDispatch();
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsBySort,
  });

  useEffect(() => {
    dispatch(productAction.addProducts(data?.data));
  }, [data, dispatch]);
  return (
    <Fragment>
      <Featured />
      <SlimBlock items={slimPromotion} />
    </Fragment>
  );
};
