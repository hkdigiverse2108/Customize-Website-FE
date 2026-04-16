import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = layoutSlice.actions;

export default layoutSlice.reducer;
