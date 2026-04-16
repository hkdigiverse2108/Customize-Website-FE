import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./slices/LayoutSlice";
import AuthSlice from "./slices/AuthSlice";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    auth: AuthSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
