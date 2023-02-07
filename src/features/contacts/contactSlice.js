import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

const user = JSON.parse(localStorage.getItem("user"));

export const filterByCampaignID = createAsyncThunk(
  "contacts/filterByCampaignID",
  async (campaignId, thunkAPI) => {
    try {
      const userID = 3;
      return await contactService.selectContacts(userID, campaignId);
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

export const filterByTags = createAsyncThunk(
  "contacts/filterByTags",
  async (filterTags, contactList, thunkAPI) => {
    try {
      return await contactService.selectContactsByTags(contactList, filterTags);
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

export const getAllTags = createAsyncThunk(
  "contacts/getAllTags",
  async (thunkAPI) => {
    try {
      const userID = 3;
      return await contactService.getAllTags(userID);
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

export const addToSelected = createAsyncThunk(
  "contacts/addToSelected",
  async (add, thunkAPI) => {
    try {
      return await contactService.addToSelected(
        add,
        thunkAPI.getState().contacts.filteredSelectedContacts,
        thunkAPI.getState().contacts.filteredNonSelectedContacts
      );
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
export const removeFromSelected = createAsyncThunk(
  "contacts/removeFromSelected",
  async (remove, thunkAPI) => {
    try {
      return await contactService.removeFromSelected(
        remove,
        thunkAPI.getState().contacts.filteredSelectedContacts,
        thunkAPI.getState().contacts.filteredNonSelectedContacts
      );
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
  selectedContacts: [],
  nonSelectedContacts: [],
  filteredSelectedContacts: [],
  filteredNonSelectedContacts: [],
  allFilterTags: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    // addToSelected: (state, action) => {
    //   state.selectedContacts.push(action.payload);
    //   const removeIndexes = action.payload.map((item) =>
    //     state.nonSelectedContacts.findIndex(item)
    //   );
    //   state.nonSelectedContacts = state.nonSelectedContacts.filter(
    //     (contact, index) => !removeIndexes.includes(index)
    //   );
    // },
    // removeFromSelected: (state, action) => {
    //   state.nonSelectedContacts.push(action.payload);
    //   console.log(action.payload);
    //   const removeIndexes = action.payload.map((item) =>
    //     state.selectedContacts.findIndex((con) => con.wtsp === item)
    //   );
    //   state.selectedContacts = state.selectedContacts.filter(
    //     (contact, index) => !removeIndexes.includes(index)
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterByCampaignID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterByCampaignID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.selectedContacts = action.payload.selected;
        state.nonSelectedContacts = action.payload.nonSelected;
        state.filteredSelectedContacts = action.payload.selected;
        state.filteredNonSelectedContacts = action.payload.nonSelected;
      })
      .addCase(filterByCampaignID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.selectedContacts = [];
        state.nonSelectedContacts = [];
      })
      .addCase(filterByTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterByTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.filteredSelectedContacts = action.payload.selected;
        state.filteredNonSelectedContacts = action.payload.nonSelected;
      })
      .addCase(filterByTags.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.filteredSelectedContacts = [];
        state.filteredNonSelectedContacts = [];
      })
      .addCase(getAllTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.allFilterTags = action.payload;
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.allFilterTags = [];
      })
      .addCase(addToSelected.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToSelected.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.selectedContacts = action.payload.selected;
        state.nonSelectedContacts = action.payload.nonSelected;
        state.filteredSelectedContacts = action.payload.selected;
        state.filteredNonSelectedContacts = action.payload.nonSelected;
      })
      .addCase(addToSelected.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeFromSelected.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromSelected.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.selectedContacts = action.payload.selected;
        state.nonSelectedContacts = action.payload.nonSelected;
        state.filteredSelectedContacts = action.payload.selected;
        state.filteredNonSelectedContacts = action.payload.nonSelected;
      })
      .addCase(removeFromSelected.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
