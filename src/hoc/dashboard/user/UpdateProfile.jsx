import { TextField } from "@mui/material";
import { profileUpdate } from "components/auth/form/schema";
import LoadingSpinner from "components/reuseable/Spinner";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "store/apiSlice";
import {
  selectCurrentToken,
  selectCurrentUser,
  setCredential,
} from "store/auth/authSlice";
import { errorHelper, showToast } from "utils/tools";

export const UpdateProfile = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUserProfile, { isLoading, isSuccess }] =
    useUpdateProfileMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.user?.email,
      firstname: user?.user?.firstname,
      lastname: user?.user?.lastname,
    },
    validationSchema: profileUpdate,
    onSubmit: (values) => {
      console.log(values);
      submitForm(values);
    },
  });

  const canSave =
    !!formik.values.firstname &&
    !!formik.values.email &&
    !!formik.values.lastname &&
    !isLoading;

  const submitForm = async (values) => {
    if (canSave) {
      try {
        const res = await updateUserProfile({ ...values }).unwrap();
        // formik.values.email = "";
        // formik.values.name = "";
        dispatch(setCredential({ user: res?.data, accesstoken: token }));
        // localStorage.setItem("waveToken", res?.token);
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
    showToast("SUCCESS", "Profile updated successfully!");
  }
  return (
    <div style={{ marginBottom: "2rem" }}>
      {isLoading && <LoadingSpinner />}

      {/* <h2>Update user profile</h2> */}

      {!isLoading && (
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <TextField
              style={{
                width: "80%",
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
                width: "80%",
                fontSize: "1rem",
                marginTop: "1.5rem",
              }}
              type="text"
              name="firstname"
              label="Firstname"
              variant="outlined"
              {...formik.getFieldProps("firstname")}
              {...errorHelper(formik, "firstname")}
            />
          </div>
          <div className="form-group">
            <TextField
              style={{
                width: "80%",
                fontSize: "1rem",
                marginTop: "1.5rem",
              }}
              type="text"
              name="lastname"
              label="Lastname"
              variant="outlined"
              {...formik.getFieldProps("lastname")}
              {...errorHelper(formik, "lastname")}
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
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};
