import { TextField } from "@mui/material";
import LoadingSpinner from "components/reuseable/Spinner";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "store/apiSlice";
import { setCredential } from "store/auth/authSlice";
import { errorHelper, showToast } from "utils/tools";
import { signin } from "./schema";

export const Signin = (props) => {
  const dispatch = useDispatch();

  const [signinUser, { isLoading, isError, isSuccess }] = useSigninMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signin,
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const canSave =
    Boolean(formik.values.password) &&
    Boolean(formik.values.email) &&
    !isLoading;
  const submitForm = async (values) => {
    if (canSave) {
      try {
        const res = await signinUser({ ...values }).unwrap();
        formik.values.email = "";
        formik.values.password = "";

        console.log(res?.data);
        console.log(res?.token);
        dispatch(setCredential({ user: res?.data, accesstoken: res?.token }));
        localStorage.setItem("waveToken", res?.token);
        navigate("/");
      } catch (error) {
        console.log("Failed to save post");
        console.log(error);
        const msg =
          error?.data?.error?.message ||
          error?.data?.message ||
          "Something went wrong! Try again";
        showToast("ERROR", msg);
      } finally {
        // setReqStatus('idle')
      }
    }
  };

  // console.log(error);
  if (isError) {
  }
  if (isSuccess) {
    showToast("SUCCESS", "Login successfully!");
    // navigate("/");
  }

  return (
    <div className="auth_container">
      {isLoading && <LoadingSpinner />}

      {!isLoading && (
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <TextField
              style={{
                width: "100%",
                fontSize: "1rem",
                marginTop: "1rem",
              }}
              name="email"
              label="Enter your email"
              variant="outlined"
              {...formik.getFieldProps("email")}
              {...errorHelper(formik, "email")}
            />
          </div>
          <div className="form-group">
            <TextField
              style={{
                width: "100%",
                fontSize: "1rem",
                marginTop: "1.5rem",
              }}
              type="password"
              name="password"
              label="Enter your password"
              variant="outlined"
              {...formik.getFieldProps("password")}
              {...errorHelper(formik, "password")}
            />
          </div>
          <button
            disabled={!canSave}
            className="btn_reuseable"
            type="submit"
            style={{
              color: "#fff",
              marginTop: "1rem",
              background: "#101d2c",
            }}
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};
