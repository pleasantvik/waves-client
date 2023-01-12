import { Fragment, useEffect } from "react";
import { Featured } from "components/home/Featured";
import { SlimBlock } from "utils/promotions/SlimBlock";
// import { useQuery } from "@tanstack/react-query";
// import { getProductsBySort } from "services/api";
import { useDispatch } from "react-redux";
// import { productAction } from "store/productSlice";
import { useGetProductsQuery } from "store/apiSlice";
import { CardBlock } from "utils/products/CardBlock";
import LoadingSpinner from "components/reuseable/Spinner";
import { byDate, bySold } from "store/productSlice";

const slimPromotion = {
  img: "/images/featured/featured_home.jpg",
  title: "Up to 40%",
  subtitle: "In second hand guitar",
  linkTitle: "Shop Now",
  linkTo: "/shop",
};

export const Home = () => {
  const dispatch = useDispatch();

  const { data: orderSold, isLoading: bySoldLoading } = useGetProductsQuery({
    limit: 4,
    sort: "itemSold",
  });
  const { data: orderDate, isLoading: byDateLoading } = useGetProductsQuery({
    limit: 4,
    sort: "-date",
  });

  useEffect(() => {
    dispatch(bySold(orderSold?.data));
    dispatch(byDate(orderDate?.data));
  }, [dispatch, orderDate, orderSold]);

  // console.log(bySoldError?.data?.error?.message, "error");
  // console.log(bySoldError?.data?.message, "error");
  console.log(orderSold?.data);
  console.log(orderDate);

  // useEffect(() => {
  //   // if (isSuccess) {
  //   //   dispatch(
  //   //     notificationAction.onSuccess({ success: "success", msg: "Great" })
  //   //   );
  //   // }

  //   if (!soldIsFetching && bySoldIsError) {
  //     dispatch(
  //       notificationAction.onError({
  //         error: true,
  //         msg: bySoldError?.data?.error?.message || bySoldError?.data?.message,
  //       })
  //     );
  //   }
  //   if (!dateIsFetching && byDateIsError) {
  //     dispatch(
  //       notificationAction.onError({
  //         error: true,
  //         msg: byDateError?.data?.error?.message || byDateError?.data?.message,
  //       })
  //     );
  //   }
  //   if (soldSuccess || dateSuccess) {
  //     notificationAction.onSuccess({ success: true, msg: "Great" });
  //   }
  //   /*
  //   if (!soldIsFetching && bySoldIsError) {
  //     showToast("ERROR", bySoldError?.data?.error?.message);
  //   }
  //   if (byDateIsError && !dateIsFetching) {
  //     showToast("ERROR", byDateError?.data?.error?.message);
  //   }
  //   if (soldSuccess || dateSuccess) {
  //     showToast("SUCCESS", "Successful");
  //   }
  //   */
  //   if (soldSuccess || dateSuccess) {
  //     showToast("SUCCESS", "Successful");
  //   }
  // });

  // console.log(orderSold?.data?.data, "prod");
  // console.log(orderDate?.data?.data, "prodDate");
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
