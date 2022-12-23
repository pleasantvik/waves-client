import { Link } from "react-router-dom";
import classes from "./Header.module.css";
export const Header = () => {
  return (
    <header className={classes.header}>
      <div className={`container ${classes.header__container}`}>
        <div className={classes.header__logo}>Waves</div>
        <div className={classes.header__right}>
          <div className={classes.header__top__right}>
            <div className={classes.header__nav}>
              <div className={classes.header__cart}>
                <span>0</span>
                <Link to="/dashboard/user/user_cart">My cart</Link>
              </div>
              <Link to="/dashboard">My Account</Link>
              <span onClick={() => alert("log out")}>Logout</span>
              <Link to="/signin">Log in</Link>
            </div>
          </div>
          <div className={classes.header__bottom__right}>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
          </div>
        </div>
      </div>
    </header>
  );
};
