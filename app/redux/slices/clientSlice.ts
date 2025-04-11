import { clientState } from "./../../interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: clientState = {
  identifyCode: null,
  nameSurname: "",
  phone: "",
  typeOfPerson: 1,
  clientAddress: {},
  comment: ""
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setIdentifyCode: (state, action: { payload: string }) => {
      state.identifyCode = action.payload;
    }, 
  },
});

export const { setIdentifyCode } = clientSlice.actions;
export default clientSlice.reducer;
