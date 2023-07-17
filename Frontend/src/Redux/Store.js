import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
