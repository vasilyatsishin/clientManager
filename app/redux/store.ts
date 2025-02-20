import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    generalSlice: generalSlice,
    authSlice: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
