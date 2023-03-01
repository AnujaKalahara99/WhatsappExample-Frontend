import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "./sendMessageService";

export const send = createAsyncThunk(
  "wtspSendMessage/send",
  async (sendPrivateMessage, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const contacts = thunkAPI.getState().contacts.filteredSelectedContacts;
      const toFromCreateAd = contacts.map((con) => con.wtsp);
      const toFromSingleMsg = [thunkAPI.getState().messages.selectedContact];
      const { templateData, messageBody } = thunkAPI.getState().sendMessage;
      const messageData = {
        to: sendPrivateMessage ? toFromSingleMsg : toFromCreateAd,
        message: sendPrivateMessage ? messageBody : "",
        template: sendPrivateMessage ? "" : templateData.name,
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

const sendMessageSlice = createSlice({
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
    removeAllContacts(state) {
      state.to = [];
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
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(send.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
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
  removeAllContacts,
  selectTemplate,
  updateTemplateVariables,
  updateMessage,
  reset,
} = sendMessageSlice.actions;
export default sendMessageSlice.reducer;
