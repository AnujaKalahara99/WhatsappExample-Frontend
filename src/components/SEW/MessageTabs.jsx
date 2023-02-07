import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel, TabProps } from "./utility/TabPanel";
import WhatsappSendWindow from "./WhatsappSendWindow";

const MessageTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Whatsapp" {...TabProps(0)} />
          <Tab label="SMS" {...TabProps(1)} />
          <Tab label="Email" {...TabProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <WhatsappSendWindow />
      </TabPanel>
      <TabPanel value={value} index={1}>
        SMS Functionality
      </TabPanel>
      <TabPanel value={value} index={2}>
        Email Functionality
      </TabPanel>
    </Box>
  );
};

export default MessageTabs;
