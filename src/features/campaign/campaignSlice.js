import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import campaignService from "./campaignService";

const user = JSON.parse(localStorage.getItem("user"));

export const getAllCampaigns = createAsyncThunk(
  "campaigns/getAll",
  async (thunkAPI) => {
    try {
      return await campaignService.getAll(user);
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
  allCampaigns: [],
  selectedCampaign: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    selectCampaign: (state, action) => {
      state.selectedCampaign = action.payload;
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCampaigns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCampaigns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allCampaigns = action.payload;
      })
      .addCase(getAllCampaigns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, selectCampaign } = campaignSlice.actions;
export default campaignSlice.reducer;
