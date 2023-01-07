import React from "react";
import { DashboardLayout } from "../DashboardLayout";
import { UpdatePassword } from "./UpdatePassword";
import { UpdateProfile } from "./UpdateProfile";

export const UserProfile = () => {
  return (
    <DashboardLayout title="User Profile">
      <UpdateProfile />
      <UpdatePassword />
    </DashboardLayout>
  );
};
