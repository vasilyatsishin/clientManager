import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice";
import authSlice from "./slices/authSlice";
import documentsSlice from "./slices/documentsSlice"
import clientSlice from "./slices/clientSlice"

export const store = configureStore({
  reducer: {
    generalSlice: generalSlice,
    authSlice: authSlice,
    documentsSlice: documentsSlice,
    clientSlice: clientSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
