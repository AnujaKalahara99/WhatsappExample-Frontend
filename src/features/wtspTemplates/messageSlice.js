import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "./messageService";

export const send = createAsyncThunk(
  "wtspMessage/send",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const contacts = thunkAPI.getState().contacts.selectedContacts;
      const to = contacts.map((con) => con.wtsp);
      const templateData = thunkAPI.getState().message.templateData;
      const messageData = {
        to,
        template: templateData.name,
        body_params: templateData.body,
        header_params: templateData.header,
      };
      return await messageService.send(messageData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          JSON.stringify(error.response.data.message)) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  to: [],
  messageBody: "",
  templateData: {
    name: "",
    header: [],
    body: [],
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const messageSlice = createSlice({
  name: "wtspSendMessage",
  initialState,
  reducers: {
    addContacts(state, action) {
      state.to.push(action.payload);
    },
    removeContacts(state, action) {
      const indexes = action.payload.map((removeItem) =>
        state.to.indexOf(removeItem)
      );
      state.to.filter((item, i) => indexes.indexOf(i) === -1);
    },
    selectTemplate(state, action) {
      state.templateData.name = action.payload;
    },
    updateTemplateVariables(state, action) {
      const { header, body } = action.payload;
      if (header) state.templateData.header = header;
      if (body) state.templateData.body = body;
    },
    updateMessage(state, action) {
      state.messageBody = action.payload;
    },
    reset(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(send.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(send.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "";
        state.isSuccess = true;
      })
      .addCase(send.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  addContacts,
  removeContacts,
  selectTemplate,
  updateTemplateVariables,
  updateMessage,
  reset,
} = messageSlice.actions;
export default messageSlice.reducer;
