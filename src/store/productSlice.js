import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    bySold: null,
    byDate: null,
    paginateProduct: null,
    removeProduct: null,
  },
  reducers: {
    bySold: (state, action) => {
      state.bySold = action.payload;
    },
    byDate: (state, action) => {
      state.byDate = action.payload;
    },
    byPaginate: (state, action) => {
      state.paginateProduct = action.payload;
    },
    onRemove: (state, action) => {
      // const { id } = action.payload;
      // const existingProd = state.paginateProduct?.products?.docs?.filter(
      //   (prod) => prod._id !== id
      // );

      // state.paginateProduct = existingProd;
      state.removeProduct = true;
    },
    reset: (state) => {
      state.removeProduct = false;
    },
  },
});

export const productReducer = productSlice.reducer;
export const { bySold, byDate, byPaginate, onRemove, reset } =
  productSlice.actions;

export const selectPaginate = (state) => state.products.paginateProduct;
export const removedProduct = (state) => state.products.removeProduct;
