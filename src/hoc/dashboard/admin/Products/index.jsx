import * as Yup from "yup";

import { useFormik } from "formik";
import { DashboardLayout } from "hoc/dashboard/DashboardLayout";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
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
import { ProductsTable } from "./ProductsTable";
import { TextField } from "@mui/material";

const defaultValues = {
  keywords: "",
  brand: [],
  min: 0,
  max: 5000,
  frets: [],
  page: 1,
};

export const AdminProducts = () => {
  // const { id } = useParams();
  const allProduct = useSelector(selectPaginate);

  const onRemoveProduct = useSelector(removedProduct);
  const [removeModal, setRemoveModal] = useState(false);
  const [toRemove, setToRemove] = useState(null);
  const navigate = useNavigate();
  const [deleteProduct, { isLoading: delLoading, isSuccess }] =
    useDeleteProductMutation();

  const [query, setQuery] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultValues
  );
  const [products, { isLoading }] = usePaginateProductMutation();
  const dispatch = useDispatch();

  const gotoPage = (page) => {
    setQuery({ page: page });
  };

  const gotoEdit = (id) => {
    navigate(`/dashboard/admin/edit_product/${id}`);
  };

  const handleClose = () => {
    setRemoveModal(false);
    console.log("cloaseee");
  };

  const handleModal = (id) => {
    setToRemove(id);
    setRemoveModal(true);
  };
  // console.log(allProduct?.paginateProduct?.products);
  // const newP = allProduct?
  const handleRemove = () => {
    dispatch(onRemove());
    deleteProduct(toRemove);
    navigate("/dashboard");

    // const updateProd = allProduct

    // if (isSuccess) {
    //   showToast('SUCCESS, "SUcc');
    // }
  };

  const getProducts = useCallback(async () => {
    try {
      const res = await products({ ...query }).unwrap();
      //   console.log(res?.data?.products);
      dispatch(byPaginate({ paginateProduct: res?.data }));
    } catch (err) {
      console.log(err);
    }
  }, [query, products, dispatch]);

  const formik = useFormik({
    initialValues: {
      keywords: "",
    },
    validationSchema: Yup.object({
      keywords: Yup.string().min(3, "Enter 3 cgaracter and above"),
    }),
    onSubmit: (values, { resetForm }) => {
      setQuery({ keywords: values.keywords, page: 1 });
      resetForm();
    },
  });

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    handleClose();
    setRemoveModal(null);
    // showToast("SUCCESS", "Product deleted succesfully");

    // dispatch(byPaginate({ paginateProduct: query }));
    // if (onRemoveProduct === true) {
    //   console.log(allProduct);
    // getProducts();
    // }

    // console.log(onRemoveProduct, "useEffect");
  }, []);

  const resetSearch = () => {
    setQuery(defaultValues);
  };

  return (
    <DashboardLayout title="Products">
      <div className="products_table">
        <div>
          <form className="mt-3" onSubmit={formik.handleSubmit}>
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
              onClick={() => resetSearch()}
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
          </form>
        </div>
        <br />
        <ProductsTable
          prev={(page) => gotoPage(page)}
          next={(page) => gotoPage(page)}
          gotoEdit={gotoEdit}
          removeModal={removeModal}
          handleClose={handleClose}
          handleModal={handleModal}
          handleRemove={handleRemove}
        />
      </div>
    </DashboardLayout>
  );
};
