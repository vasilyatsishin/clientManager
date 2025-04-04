import { clientState } from "./../../interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: clientState = {
  identifyCode: null,
  nameSurname: "",
  phone: "",
  typeOfPerson: null,
  clientAddress: {},
  comment: ""
};

const clientSlice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    
  },
});

export const { } = clientSlice.actions;
export default clientSlice.reducer;
