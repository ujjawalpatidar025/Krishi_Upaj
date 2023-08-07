import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    add: (state, action) => {
      state.user = action.payload;
    },
    gettoken: (state, action) => {
      state.token = action.payload;
    },
    remove: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { add, gettoken, remove } = authReducer.actions;
export default authReducer.reducer;
