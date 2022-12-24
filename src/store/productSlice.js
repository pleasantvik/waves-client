import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {
      bySold: [],
      byDate: [],
    },
  },
  reducers: {
    bySold: (state, action) => {
      // state.products.push(action.payload);
      state.products.bySold.push(action.payload);
    },
    byDate: (state, action) => {
      // state.products.push(action.payload);
      state.products.byDate.push(action.payload);
    },
  },
});

export const productReducer = productSlice.reducer;
export const productAction = productSlice.actions;
