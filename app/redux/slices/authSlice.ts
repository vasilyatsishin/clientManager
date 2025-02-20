import { authState, UserInfoResponse } from "./../../interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: authState = {
  exist: false,
  bosId: null,
  user: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setIsExist: (state, action: { payload: boolean }) => {
      state.exist = action.payload;
    },
    setBosId: (state, action: { payload: number }) => {
      state.bosId = action.payload;
    },
    setUserInfo: (state, action: { payload: UserInfoResponse }) => {
      state.user = action.payload;
    },
  },
});

export const { setIsExist, setBosId, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
