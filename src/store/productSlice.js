import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state = state.products.push(action.payload);
    },
  },
});

export const productReducer = productSlice.reducer;
export const productAction = productSlice.actions;
