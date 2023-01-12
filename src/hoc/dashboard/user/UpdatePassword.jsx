import { TextField } from "@mui/material";
import { passwordUpdate } from "components/auth/form/schema";
import LoadingSpinner from "components/reuseable/Spinner";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "store/apiSlice";
import { setCredential } from "store/auth/authSlice";
import { errorHelper, showToast } from "utils/tools";

export const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUserPassword, { isLoading, isSuccess }] =
    useUpdatePasswordMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordUpdate,
    onSubmit: (values) => {
      console.log(values);
      submitForm(values);
    },
  });

  const canSave =
    !!formik.values.currentPassword &&
    !!formik.values.password &&
    !!formik.values.confirmPassword &&
    !isLoading;

  const submitForm = async (values) => {
    if (canSave) {
      try {
        const res = await updateUserPassword({ ...values }).unwrap();
        // formik.values.email = "";
        // formik.values.name = "";
        dispatch(setCredential({ user: res?.data, accesstoken: res?.token }));
        localStorage.setItem("waveToken", res?.token);
        navigate("/dashboard");
        // props.onLogin();
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

  if (isSuccess) {
    showToast("SUCCESS", "Password updated successfully!");
  }
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <h2>Password Change</h2>

      {!isLoading && (
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <TextField
              style={{
                width: "80%",
                fontSize: "1rem",
                marginTop: "1rem",
              }}
              name="currentPassword"
              type="password"
              label="Old Password"
              variant="outlined"
              {...formik.getFieldProps("currentPassword")}
              {...errorHelper(formik, "currentPassword")}
            />
          </div>
          <div className="form-group">
            <TextField
              style={{
                width: "80%",
                fontSize: "1rem",
                marginTop: "1.5rem",
              }}
              type="password"
              name="password"
              label="New Password"
              variant="outlined"
              {...formik.getFieldProps("password")}
              {...errorHelper(formik, "password")}
            />
          </div>
          <div className="form-group">
            <TextField
              style={{
                width: "80%",
                fontSize: "1rem",
                marginTop: "1.5rem",
              }}
              type="password"
              name="confirmPassword"
              label="Confirm New Password"
              variant="outlined"
              {...formik.getFieldProps("confirmPassword")}
              {...errorHelper(formik, "confirmPassword")}
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
            Update Password
          </button>
        </form>
      )}
    </div>
  );
};
