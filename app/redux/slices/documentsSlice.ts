import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentsState } from "../../interfaces/interfaces";

const initialState = {
  documents: {} as DocumentsState,
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments: (
      state,
      action: PayloadAction<{ business: string; type: "sended" | "not sended"; documents: any[] }>
    ) => {
      const { business, type, documents } = action.payload;
      if (!state.documents[business]) {
        state.documents[business] = {};
      }
      state.documents[business][type] = documents;
    },
  },
});

export const { setDocuments } = documentsSlice.actions;
export default documentsSlice.reducer;