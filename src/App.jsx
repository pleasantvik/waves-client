import { Route, Routes } from "react-router-dom";
import { Header } from "components/navigation/Header";
import { Footer } from "components/navigation/Footer";
import { Home } from "components/home";
import { Layout } from "hoc/Layout";
import { RegisterLogin } from "components/auth";
import { showToast } from "utils/tools";
import { useGetAuthQuery } from "store/apiSlice";
import LoadingSpinner from "components/reuseable/Spinner";
import { useEffect } from "react";
import { setCredential } from "store/auth/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserDashboard } from "hoc/dashboard";
import { UserProfile } from "hoc/dashboard/user/userProfile";
import { AdminProducts } from "hoc/dashboard/admin/Products";
import { AddProduct } from "hoc/dashboard/admin/add/AddProduct";
import { EditProduct } from "hoc/dashboard/admin/edit/EditProduct";
import { Shop } from "components/shop";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("waveToken");

  const { data: isAuth, isLoading, error, isError } = useGetAuthQuery();

  useEffect(() => {
    dispatch(
      setCredential({
        user: { user: isAuth?.data },
        accesstoken: isAuth?.token,
      })
    );
  }, [dispatch, isAuth]);

  if (isError && error?.status === 500) {
    showToast("ERROR", "Use the log in route to gain full access!");
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <Header />
      <Layout>
        <Routes>
          {token && <Route path="/dashboard" element={<UserDashboard />} />}
          {token && <Route path="/shop" element={<Shop />} />}
          {token && (
            <Route path="/dashboard/user/profile" element={<UserProfile />} />
          )}
          {token && (
            <Route
              path="/dashboard/admin/admin_products"
              element={<AdminProducts />}
            />
          )}
          {token && (
            <Route
              path="/dashboard/admin/add_products"
              element={<AddProduct />}
            />
          )}
          {token && (
            <Route
              path="/dashboard/admin/edit_product/:id"
              element={<EditProduct />}
            />
          )}

          {token && <Route path="/signin" element={<RegisterLogin />} />}
          <Route path="/" element={<Home />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Layout>
      <ToastContainer />

      <Footer />
    </div>
  );
};

export default App;

// const { createProxyMiddleware } = require("http-proxy-middleware");
// module.exports = function (app) {
//   app.use(
//     ["/api", "/res.cloudinary.com/"],
//     createProxyMiddleware({
//       target: "http://localhost:3001",
//     })
//   );
// };
