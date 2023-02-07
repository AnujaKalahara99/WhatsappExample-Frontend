import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import templateReducer from "../features/wtspTemplates/templateSlice";
import messageReducer from "../features/wtspTemplates/messageSlice";
import campaignReducer from "../features/campaign/campaignSlice";
import contactReducer from "../features/contacts/contactSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    template: templateReducer,
    message: messageReducer,
    campaigns: campaignReducer,
    contacts: contactReducer,
  },
});

export default store;
