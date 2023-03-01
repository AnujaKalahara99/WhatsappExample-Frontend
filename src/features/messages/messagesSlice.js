import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messagesService from "./messagesService";

export const getAll = createAsyncThunk(
  "messages/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user.id;
      return await messagesService.getAll(3, token);
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

export const getContactMessages = createAsyncThunk(
  "messages/getContactMessages",
  async (contact, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user.id;
      thunkAPI.dispatch(setSelected(contact));
      return await messagesService.getContactMessages(3, token, contact);
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
  messagesLog: [],
  selectedContact: "",
  contactLog: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    reset(state) {
      state = initialState;
    },
    setSelected(state, action) {
      state.selectedContact = action.payload;
    },
    addContactMessage(state, action) {
      state.contactLog = [...state.contactLog, action.payload];
    },
    updateContactMessage(state, action) {
      const index = state.contactLog.findIndex(
        (msg) => msg._id === action.payload._id
      );
      if (index !== -1) state.contactLog[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "";
        state.isSuccess = true;
        state.messagesLog = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContactMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContactMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "";
        state.isSuccess = true;
        state.contactLog = action.payload;
      })
      .addCase(getContactMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setSelected, addContactMessage, updateContactMessage } =
  messagesSlice.actions;
export default messagesSlice.reducer;
