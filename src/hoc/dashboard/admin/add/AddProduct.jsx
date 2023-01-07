import { useFormik } from "formik";
import { DashboardLayout } from "hoc/dashboard/DashboardLayout";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetBrandsQuery,
  usePaginateProductMutation,
} from "store/apiSlice";
import {
  byPaginate,
  onRemove,
  removedProduct,
  reset,
  selectPaginate,
} from "store/productSlice";
import { errorHelper, showToast } from "utils/tools";
// import { ProductsTable } from "./ProductsTable";
import {
  TextField,
  Button,
  Divider,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { productSchema } from "components/auth/form/schema";
import { getBrands } from "store/brandSlice";

export const AddProduct = (props) => {
  const dispatch = useDispatch();
  const {
    data: brands,
    isLoading: brandsLoading,
    error: brandError,
    isError: brandIsError,
  } = useGetBrandsQuery();

  useEffect(() => {
    console.log(brands?.data, "BRANDS");
    dispatch(getBrands({ brands: brands?.data }));
  }, [dispatch, brands]);

  const formik = useFormik({
    initialValues: {
      model: "",
      brand: "",
      frets: "",
      woodtype: "",
      description: "",
      price: "",
      shipping: false,
      available: "",
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <DashboardLayout>
      <Fragment>
        <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <TextField
              style={{
                width: "100%",
                fontSize: "1rem",
                marginTop: "1.5rem",
              }}
              type="text"
              name="model"
              label="Enter your model"
              variant="outlined"
              {...formik.getFieldProps("model")}
              {...errorHelper(formik, "model")}
            />
          </div>
          <div className="form-group">
            <TextField
              style={{
                width: "100%",
                fontSize: "1rem",
                marginTop: "1.5rem",
              }}
              type="number"
              name="frets"
              label="Enter your frets"
              variant="outlined"
              {...formik.getFieldProps("frets")}
              {...errorHelper(formik, "frets")}
            />
          </div>
          <div className="form-group">
            <TextField
              style={{
                width: "100%",
                fontSize: "1rem",
                marginTop: "1.5rem",
              }}
              type="text"
              name="woodtype"
              label="Enter your woodtype"
              variant="outlined"
              {...formik.getFieldProps("woodtype")}
              {...errorHelper(formik, "woodtype")}
            />
          </div>
          <div className="form-group">
            <FormControl>
              <h5>Select a brand</h5>
              <Select
                name="brand"
                {...formik.getFieldProps("brand")}
                error={
                  formik.errors.brand && formik.touched.brand ? true : false
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {brands &&
                  brands?.data?.map((brand) => (
                    <MenuItem value={brand._id} key={brand._id}>
                      <em>{brand.name}</em>
                    </MenuItem>
                  ))}
              </Select>
              {formik.errors.brand && formik.touched.brand ? (
                <FormHelperText error={true}>
                  {formik.errors.brand}
                </FormHelperText>
              ) : (
                false
              )}
            </FormControl>
          </div>

          <div className="form-group">
            <TextField
              style={{
                width: "100%",
                fontSize: "1rem",
                marginTop: "1.5rem",
              }}
              type="text"
              name="description"
              label="Enter your description"
              variant="outlined"
              {...formik.getFieldProps("description")}
              {...errorHelper(formik, "description")}
              multiline
              rows={4}
            />
          </div>

          <div className="form-group">
            <TextField
              style={{
                width: "100%",
                fontSize: "1rem",
                marginTop: "1.5rem",
              }}
              type="number"
              name="price"
              label="Enter your price"
              variant="outlined"
              {...formik.getFieldProps("price")}
              {...errorHelper(formik, "price")}
            />
          </div>

          <div className="form-group">
            <TextField
              style={{
                width: "100%",
                fontSize: "1rem",
                marginTop: "1.5rem",
              }}
              type="number"
              name="available"
              label="How many of this do we have in stock"
              variant="outlined"
              {...formik.getFieldProps("available")}
              {...errorHelper(formik, "available")}
            />
          </div>
          <Divider className="mt-3 mb-3" />
          <div className="form-group">
            <FormControl>
              <h5>Do we offer free shipping?</h5>
              <Select
                name="shipping"
                {...formik.getFieldProps("shipping")}
                error={
                  formik.errors.shipping && formik.touched.shipping
                    ? true
                    : false
                }
              >
                <MenuItem value={true}> Yes</MenuItem>
                <MenuItem value={false}> No</MenuItem>
              </Select>
              {formik.errors.shipping && formik.touched.shipping ? (
                <FormHelperText error={true}>
                  {formik.errors.shipping}
                </FormHelperText>
              ) : (
                false
              )}
            </FormControl>
          </div>
          <Divider className="mt-3 mb-3" />

          <button
            className="btn_reuseable"
            type="submit"
            style={{
              color: "#fff",
              marginTop: "1rem",
              background: "#101d2c",
            }}
          >
            Add product
          </button>
        </form>
      </Fragment>
    </DashboardLayout>
  );
};
