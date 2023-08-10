import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authReducer";
import machineReducer from './Slices/machineReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    machine:machineReducer
  },
});
