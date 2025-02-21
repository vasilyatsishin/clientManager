import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice";
import authSlice from "./slices/authSlice";
import documentsSlice from "./slices/documentsSlice"

export const store = configureStore({
  reducer: {
    generalSlice: generalSlice,
    authSlice: authSlice,
    documentsSlice: documentsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
