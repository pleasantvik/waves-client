import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "store/auth/authSlice";
import { DashboardLayout } from "./DashboardLayout";

export const UserDashboard = () => {
  const user = useSelector(selectCurrentUser);
  console.log(user);

  return (
    <DashboardLayout title="Overview">
      <div className="user_nfo_panel">
        <div>
          <span>{user?.user?.firstname}</span>
          <span>{user?.user?.lastname}</span>
          <span>{user?.user?.email}</span>
        </div>
        {user?.user?.history && (
          <div className="user_nfo_panel">
            <h2>History of purchases</h2>
            <div className="user_product_block_wrapper">historty</div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
