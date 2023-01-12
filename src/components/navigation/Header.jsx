import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
} from "store/auth/authSlice";
import { showToast } from "utils/tools";
import classes from "./Header.module.css";

export const Header = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(user?.user);

  const handleLogout = async () => {
    await axios.get("/api/users/logout");
    localStorage.removeItem("waveToken");
    dispatch(logout());
    console.log("log out");
    navigate("/");
    showToast("SUCCESS", "Logout successfully! See you later");
  };

  return (
    <header className={classes.header}>
      <div className={`container ${classes.header__container}`}>
        <div className={classes.header__logo}>Guitars</div>
        <div className={classes.header__right}>
          <div className={classes.header__top__right}>
            <div className={classes.header__nav}>
              {token && (
                <div className={classes.header__cart}>
                  <span>0</span>
                  <Link to="/dashboard/user/user_cart">My cart</Link>
                </div>
              )}
              {token && (
                <Link to="/dashboard" className="user-nfo">
                  <img
                    src={`/images/users/${
                      user?.user?.photo ? user?.user?.photo : "default.jpg"
                    }`}
                    alt=""
                    className="nav__user-img"
                  />
                  <span>{user?.user?.firstname}</span>
                </Link>
              )}
              {token && <span onClick={handleLogout}>Logout</span>}
              {!token && <Link to="/signin">Log in</Link>}
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
