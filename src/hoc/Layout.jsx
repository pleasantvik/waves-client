import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "utils/tools";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "store/notificationSlice";

export const Layout = ({ children }) => {
  const notifications = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (notifications && notifications?.success) {
      const msg = notifications?.success?.msg || "successful";
      showToast("SUCCESS", msg);
      dispatch(clearNotification());
    }
    if (notifications && notifications?.error) {
      const msg = notifications?.error?.msg || "An error has occured";
      showToast("ERROR", msg);
      dispatch(clearNotification());
    }
  }, [notifications, dispatch]);

  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
};
