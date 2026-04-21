import { STORAGE_KEYS } from "@/constants";
import { Cookie, Stringify } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const StoredUser = Cookie.get(STORAGE_KEYS.USER) || null;
const StoredToken = Cookie.get(STORAGE_KEYS.TOKEN) || null;

const initialState = {
  token: StoredToken,
  user: StoredUser ? JSON.parse(StoredUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload;
      Cookie.set(STORAGE_KEYS.USER, Stringify(action.payload.user), 1);
      Cookie.set(STORAGE_KEYS.TOKEN, action.payload.token, 1);
    },
    // setUser: (state, action) => {
    //   // state.user = action.payload;
    //   // Storage.setItem(STORAGE_KEYS.USER, Stringify(action.payload));
    // },
    setSignOut(state) {
      state.token = null;
      state.user = null;
      Cookie.removeAll();
      window.location.reload();
    },
  },
});

export const { setSignin, setSignOut } = authSlice.actions;
export default authSlice.reducer;
