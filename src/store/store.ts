import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/authSlice";
import LayoutSlice from "./slices/layoutSlice";
import ModalSlice from "./slices/modalSlice";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    auth: AuthSlice,
    modal: ModalSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
