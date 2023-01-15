import LoadingSpinner from "components/reuseable/Spinner";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, userCart } from "store/auth/authSlice";
import { DashboardLayout } from "../DashboardLayout";
import { CartDetail } from "./CartDetail";

export const Cart = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const myCart = useSelector(userCart);
  console.log(myCart);

  const removeItem = (id) => {
    console.log(id, "position");
    dispatch(removeFromCart(id));
  };

  return (
    <DashboardLayout title="Your cart">
      {myCart && myCart.length > 0 && (
        <Fragment>
          <CartDetail products={myCart} removeItem={(id) => removeItem(id)} />
        </Fragment>
      )}
      {!myCart || myCart.length === 0 ? <div>Your cart is empty</div> : null}
    </DashboardLayout>
  );
};
