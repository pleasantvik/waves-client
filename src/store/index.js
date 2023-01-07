import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { userReducer } from "./userSlice";
import { productReducer } from "./productSlice";
import { notificationReducer } from "./notificationSlice";
import { authReducer } from "./auth/authSlice";
import { brandReducer } from "./brandSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    brands: brandReducer,
    products: productReducer,
    notification: notificationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
