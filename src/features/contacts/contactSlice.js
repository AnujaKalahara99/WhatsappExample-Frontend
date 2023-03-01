import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

const user = JSON.parse(localStorage.getItem("user"));

export const createContacts = createAsyncThunk(
  "contacts/createContacts",
  async (contacts, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.createContacts(token);
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

export const filterByCampaignID = createAsyncThunk(
  "contacts/filterByCampaignID",
  async (campaignIds, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.selectContacts(token, {
        campaignIds,
      });
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
  async (data, thunkAPI) => {
    const isFilteringSelected = data.isFilteringSelected
      ? data.isFilteringSelected
      : false;
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await contactService.selectContactsByTags(
        token,
        data.tags,
        data.list,
        isFilteringSelected
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
        thunkAPI.getState().contacts.selectedContacts,
        thunkAPI.getState().contacts.nonSelectedContacts,
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
        thunkAPI.getState().contacts.selectedContacts,
        thunkAPI.getState().contacts.nonSelectedContacts,
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

//For Replies Window
export const getRecentMessageFromAll = createAsyncThunk(
  "contacts/getRecentMessageFromAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await contactService.getRecentMessageFromAll(token);
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
  allContacts: [],
  selectedContacts: [],
  nonSelectedContacts: [],
  filteredSelectedContacts: [],
  filteredNonSelectedContacts: [],
  allFilterTags: [],
  recentMessageDetails: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.allContacts = [...state.allContacts, ...action.payload];
      })
      .addCase(createContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
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
        if (action.payload.isFilteringSelected)
          state.filteredSelectedContacts = action.payload.filtered;
        else state.filteredNonSelectedContacts = action.payload.filtered;
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
        state.filteredSelectedContacts = action.payload.filteredSelected;
        state.filteredNonSelectedContacts = action.payload.filteredNonSelected;
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
        state.filteredSelectedContacts = action.payload.filteredSelected;
        state.filteredNonSelectedContacts = action.payload.filteredNonSelected;
      })
      .addCase(removeFromSelected.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRecentMessageFromAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecentMessageFromAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.recentMessageDetails = action.payload.selected;
      })
      .addCase(getRecentMessageFromAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
