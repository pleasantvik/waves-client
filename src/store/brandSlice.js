import { createSlice } from "@reduxjs/toolkit";

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    brands: null,
  },
  reducers: {
    getBrands: (state, action) => {
      state.brands = action.payload;
    },
  },
});

export const brandReducer = brandSlice.reducer;
export const { getBrands } = brandSlice.actions;

export const allBrands = (state) => state.brands.brands;
