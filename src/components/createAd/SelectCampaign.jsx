import {
  Typography,
  Autocomplete,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCampaigns,
  selectCampaign,
} from "../../features/campaign/campaignSlice";

const SelectCampaign = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCampaigns());
  }, [dispatch]);

  const campaigns = useSelector((state) => state.campaigns.allCampaigns);
  const selectedCampaign = useSelector(
    (state) => state.campaigns.selectedCampaign
  );

  const handleCampaignChange = (e, newValue) => {
    dispatch(selectCampaign(campaigns.find((camp) => camp.name === newValue)));
  };

  return (
    <div>
      <Box>
        <Typography variant="h5">Campaign</Typography>
      </Box>
      <div style={{ display: "inline-flex", alignSelf: "center" }}>
        <Autocomplete
          disablePortal
          id="campaign-autocomplete"
          onChange={handleCampaignChange}
          value={selectedCampaign ? selectedCampaign.name : null}
          options={campaigns.map((campaign) => campaign.name)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Campaign" />
          )}
        />
        <Button>Create Campaign</Button>
      </div>
      <Box>
        <Typography>Campaign Info</Typography>
        {selectedCampaign && (
          <div>
            <Typography>{selectedCampaign.description}</Typography>
            <Typography>{selectedCampaign.contacts}</Typography>
          </div>
        )}
      </Box>
    </div>
  );
};

export default SelectCampaign;
