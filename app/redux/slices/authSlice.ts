import { authState, UserInfoResponse } from "./../../interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: authState = {
  exist: false,
  bosId: null,
  user: {userId: 28756, sector: ["Food", "Non-Food"]},
  accessToken: ""
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
    setUserInfo: (state, action: { payload: UserInfoResponse | null }) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: { payload: string }) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setIsExist, setBosId, setUserInfo, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
