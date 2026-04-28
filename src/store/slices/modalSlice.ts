import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUploadModal: { open: false, type: "image", multiple: false ,fieldName:""},
  selectedFiles: [],
};

const ModalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setUploadModal: (state, action) => {
      state.isUploadModal = action.payload;
    },
    setSelectedFiles: (state, action) => {
      state.selectedFiles = action.payload;
    },
  },
});

export const { setUploadModal, setSelectedFiles } = ModalSlice.actions;
export default ModalSlice.reducer;
