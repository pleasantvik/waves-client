import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { userReducer } from "./userSlice";
import { productReducer } from "./productSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
