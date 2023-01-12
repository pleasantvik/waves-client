import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { errorHelper } from "utils/tools";
import { TextField } from "@mui/material";

export const SearchBar = (props) => {
  const formik = useFormik({
    initialValues: {
      keywords: "",
    },
    validationSchema: Yup.object({
      keywords: Yup.string().min(3, "Enter 3 cgaracter and above"),
    }),
    onSubmit: (values, { resetForm }) => {
      props.handleKeywords(values.keywords);
      resetForm();
    },
  });
  return (
    <div className="container">
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            style={{
              width: "100%",
              fontSize: "1rem",
              marginTop: "1rem",
            }}
            name="keywords"
            label="Enter your search"
            variant="outlined"
            {...formik.getFieldProps("keywords")}
            {...errorHelper(formik, "keywords")}
          />

          <button
            onClick={() => props.resetSearch()}
            className="btn_reuseable"
            type="submit"
            style={{
              color: "#fff",
              marginTop: "1rem",
              background: "#101d2c",
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
