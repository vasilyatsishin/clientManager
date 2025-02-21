import { createSlice } from "@reduxjs/toolkit";
import { documentsState } from "../../interfaces/interfaces";

const initialState: documentsState = {
  typeOfShownDocuments: "not sended"
};

const documentsSlice = createSlice({
  name: "Documents",
  initialState,
  reducers: {
    changeTypeOfShownDocuments: (state, action: { payload: string }) => {
      state.typeOfShownDocuments = action.payload;
    },
  },
});

export const {
  changeTypeOfShownDocuments
} = documentsSlice.actions;
export default documentsSlice.reducer;
