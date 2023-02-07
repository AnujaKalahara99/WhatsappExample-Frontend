import MessageTabs from "../components/SEW/MessageTabs";
import { Typography, Autocomplete, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SendPage() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const [selectedCampaign, setSelectedCampaign] = useState();
  const [campaigns, setCampaigns] = useState([]);

  const handleCampaignChange = () => {};
  const handleAddCampaign = () => {};

  return (
    <div className="container">
      <div style={{ display: "inline-flex", alignSelf: "center" }}>
        <div style={{ alignSelf: "center" }}>
          <Typography variant="h5">Campaign</Typography>
        </div>
        <Autocomplete
          disablePortal
          id="campaign-autocomplete"
          onChange={handleCampaignChange}
          value={selectedCampaign === "" ? null : selectedCampaign}
          options={campaigns}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Campaign" />
          )}
        />
        <Button>Create Campaign</Button>
      </div>
      <MessageTabs />
    </div>
  );
}

export default SendPage;
