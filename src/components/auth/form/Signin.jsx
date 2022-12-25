import { TextField } from "@mui/material";
import LoadingSpinner from "components/reuseable/Spinner";
import { useFormik } from "formik";
import { useState } from "react";
import { errorHelper } from "utils/tools";
import { signin } from "./schema";

export const Signin = (props) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signin,
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
    },
  });

  //   const handleSubmit = (values) => {};
  return (
    <div className="auth_container">
      {loading && <LoadingSpinner />}

      {!loading && (
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
            className="btn_reuseable"
            type="submit"
            sx={{
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
