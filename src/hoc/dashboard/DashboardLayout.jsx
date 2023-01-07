import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "store/auth/authSlice";
import classes from "./dashboardLayout.module.css";

export const links = [
  {
    name: "My Account",
    linkTo: "/dashboard",
  },
  {
    name: "User Information",
    linkTo: "/dashboard/user/profile",
  },
  {
    name: "My Cart",
    linkTo: "/dashboard/user/user_cart",
  },
];

export const admin = [
  {
    name: "Products",
    linkTo: "/dashboard/admin/admin_products",
  },
  {
    name: "User Information",
    linkTo: "/dashboard/user/user_info",
  },
  {
    name: "Manage site",
    linkTo: "/dashboard/admin/manage_site",
  },
];

export const DashboardLayout = (props) => {
  const user = useSelector(selectCurrentUser);
  // console.log(user?.user?.role);
  const generateLinks = (data) =>
    data.map((item) => (
      <Link to={item.linkTo} key={item.name}>
        {item.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className={`${classes.user_container} ${classes.page_container}`}>
        <div className={classes.user_left_nav}>
          <h2>My account</h2>
          <div className={classes.links}>{generateLinks(links)}</div>
          {user?.user?.role === "admin" && (
            <div>
              <h2>Admin</h2>
              <div className={classes.links}>{generateLinks(admin)}</div>
            </div>
          )}
        </div>
        <div className={classes.user_right}>
          <div className={classes.dashboard_title}>
            <h2>{props.title}</h2>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};
