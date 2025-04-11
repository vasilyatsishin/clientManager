import { createSlice } from "@reduxjs/toolkit";
import { generalState } from "../../interfaces/interfaces";

const initialState: generalState = {
  theme: "",
  safeViewColor: "white",
  sectors: ["Food", "Non-Food"],
  activePage: "",
  isMainLayoutShown: true
};

const generalSlice = createSlice({
  name: "General",
  initialState,
  reducers: {
    changeTheme: (state, action: { payload: string }) => {
      state.theme = action.payload;
    },
    changeSafeViewColor: (state, action: { payload: string }) => {
      state.safeViewColor = action.payload;
    },
    changeSectors: (state, action: { payload: string[] }) => {
      state.sectors = action.payload;
    },
    changeActivePage: (state, action: { payload: string }) => {
      state.activePage = action.payload;
    },
    setIsMainLayoutShown: (state, action: { payload: boolean }) => {
      state.isMainLayoutShown = action.payload;
    }
  },
});

export const {
  changeTheme,
  changeSafeViewColor,
  changeSectors,
  changeActivePage,
  setIsMainLayoutShown
} = generalSlice.actions;
export default generalSlice.reducer;
