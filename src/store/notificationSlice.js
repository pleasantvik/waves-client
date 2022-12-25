const { createSlice } = require("@reduxjs/toolkit");

const notificationSlice = createSlice({
  name: "notification",
  initialState: {},
  reducers: {
    onError: (state, action) => {
      state.error = action.payload;
    },
    onSuccess: (state, action) => {
      state.success = action.payload;
    },
    onClear: (state) => {
      //   return { ...state, error: false, msg: "", success: false };
      return (state = {});
    },
  },
});

export const clearNotification = () => {
  return (dispatch) => {
    dispatch(notificationAction.onClear());
  };
};

export const notificationReducer = notificationSlice.reducer;
export const notificationAction = notificationSlice.actions;
