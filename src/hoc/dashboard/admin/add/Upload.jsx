import { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import LoadingSpinner from "components/reuseable/Spinner";
import { useFormik } from "formik";
import { useUploadProductImageMutation } from "store/apiSlice";

export const Upload = ({ picValue }) => {
  const [loading, setLoading] = useState(false);

  const [uploadImg] = useUploadProductImageMutation();

  // const token = localStorage.getItem("waveToken");

  const formikUpload = useFormik({
    initialValues: {
      pic: "",
    },
    validationSchema: Yup.object({
      pic: Yup.mixed().required("A file is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", values.pic);
      try {
        const file = await uploadImg(formData).unwrap();
        // const file = await uploadImg("/api/products/upload", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        console.log(file);
        picValue(file?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
      console.log(values);
    },
  });
  return (
    <Fragment>
      {loading && <LoadingSpinner />}
      {!loading && (
        <Form onSubmit={formikUpload.handleSubmit}>
          <Form.Group>
            <Form.File
              id="file"
              name="file"
              onChange={(e) =>
                formikUpload.setFieldValue("pic", e.target.files[0])
              }
            />
            {formikUpload.errors.pic && formikUpload.touched.pic && (
              <div>Error</div>
            )}
          </Form.Group>
          <button
            className="btn_reuseable"
            type="submit"
            style={{
              color: "#fff",
              marginTop: "1rem",
              background: "#101d2c",
            }}
          >
            Upload
          </button>
        </Form>
      )}
    </Fragment>
  );
};
