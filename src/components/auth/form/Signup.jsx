import { TextField } from "@mui/material";
import LoadingSpinner from "components/reuseable/Spinner";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "store/apiSlice";
import { setCredential } from "store/auth/authSlice";
import { errorHelper, showToast } from "utils/tools";
import { signup } from "./schema";
// import { schema } from '../../utils/schema'
// import { addNewPost } from './postSlice'

export const Signup = (props) => {
  const dispatch = useDispatch();

  const [signupUser, { isLoading, isError, error, isSuccess }] =
    useSignupMutation();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "bola2dee@gmail.com",
      password: "test1234",
      confirmPassword: "test1234",
      firstname: "Bolatito",
      lastname: "Ayoola",
    },
    validationSchema: signup,
    onSubmit: (values) => {
      console.log(values);
      submitForm(values);
    },
  });
  const canSave =
    Boolean(formik.values.firstname) &&
    Boolean(formik.values.lastname) &&
    Boolean(formik.values.password) &&
    Boolean(formik.values.confirmPassword) &&
    Boolean(formik.values.email) &&
    !isLoading;
  const submitForm = async (values) => {
    if (canSave) {
      try {
        const res = await signupUser({ ...values }).unwrap();
        formik.values.email = "";
        formik.values.lastname = "";
        formik.values.firstname = "";
        formik.values.password = "";
        formik.values.confirmPassword = "";

        dispatch(setCredential({ user: res?.data, accesstoken: res?.token }));
        localStorage.setItem("waveToken", res?.token);
        navigate("/");
      } catch (err) {
        console.log("Failed to save post");
      } finally {
        // setReqStatus('idle')
      }
    }
  };

  console.log(error);
  if (isError) {
    const msg =
      error?.data?.error?.message ||
      error?.data?.message ||
      "Something went wrong! Try again";
    showToast("ERROR", msg);
  }
  if (isSuccess) {
    showToast("SUCCESS", "Account created successfully");
    // navigate("/dashboard");
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
              name="firstname"
              label="Enter your firstname"
              variant="outlined"
              {...formik.getFieldProps("firstname")}
              {...errorHelper(formik, "firstname")}
            />
          </div>
          <div className="form-group">
            <TextField
              style={{
                width: "100%",
                fontSize: "1rem",
                marginTop: "1rem",
              }}
              name="lastname"
              label="Enter your lastname"
              variant="outlined"
              {...formik.getFieldProps("lastname")}
              {...errorHelper(formik, "lastname")}
            />
          </div>
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
          <div className="form-group">
            <TextField
              style={{
                width: "100%",
                fontSize: "1rem",
                marginTop: "1rem",
              }}
              type="password"
              name="confirmPassword"
              label="Confirm your password"
              variant="outlined"
              {...formik.getFieldProps("confirmPassword")}
              {...errorHelper(formik, "confirmPassword")}
            />
          </div>
          <button
            type="submit"
            className="btn_reuseable"
            disabled={!canSave}
            style={{
              margin: "1rem 0",
            }}
          >
            Create account
          </button>
        </form>
      )}
    </div>
  );
};
