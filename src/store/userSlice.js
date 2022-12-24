import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    _id: null,
    email: null,
    firstname: null,
    lastname: null,
    history: [],
    verified: null,
  },
  auth: null,
  cart: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const userReducer = userSlice.reducer;
