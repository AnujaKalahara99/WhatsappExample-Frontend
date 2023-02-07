import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import templateService from "./templateSevice";

export const getAllTemplates = createAsyncThunk(
  "wtspTemplates/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await templateService.getAll(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  templates: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const templateSlice = createSlice({
  name: "wtspTemplates",
  initialState,
  reducers: {
    reset(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTemplates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.templates = action.payload;
      })
      .addCase(getAllTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.templates = [];
      });
  },
});

export const { reset } = templateSlice.actions;
export default templateSlice.reducer;
