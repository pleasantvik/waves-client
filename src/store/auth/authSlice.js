import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, cart: null },
  reducers: {
    setCredential: (state, action) => {
      const { user, accesstoken } = action.payload;
      state.user = user;
      state.token = accesstoken;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    addCartItem: (state, action) => {
      state.cart = state.user.user.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.user.user.cart.splice(action.payload, 1);
    },
  },
});

export const { setCredential, logout, addCartItem, removeFromCart } =
  authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const userCart = (state) => state.auth.user.user.cart;
