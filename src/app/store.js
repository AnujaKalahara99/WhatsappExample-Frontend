import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import templateReducer from "../features/wtspTemplates/templateSlice";
import sendMessageReducer from "../features/wtspTemplates/sendMessageSlice";
import campaignReducer from "../features/campaign/campaignSlice";
import contactReducer from "../features/contacts/contactSlice";
import messagesReducer from "../features/messages/messagesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    template: templateReducer,
    sendMessage: sendMessageReducer,
    campaigns: campaignReducer,
    contacts: contactReducer,
    messages: messagesReducer,
  },
});

export default store;
