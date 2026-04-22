import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./slices/layoutSlice";
import AuthSlice from "./slices/authSlice";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    auth: AuthSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
