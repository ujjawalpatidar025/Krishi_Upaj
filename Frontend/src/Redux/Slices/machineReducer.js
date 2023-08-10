import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  machine: null,
 
};

const machineReducer = createSlice({
  name: "machine",
  initialState,
  reducers: {
    addMachine: (state, action) => {
      state.machine = action.payload;
    },
   
  },
});

export const {addMachine} = machineReducer.actions;
export default machineReducer.reducer;
