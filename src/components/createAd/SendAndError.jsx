import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { send } from "../../features/wtspTemplates/sendMessageSlice";

const SendAndError = () => {
  const dispatch = useDispatch();

  const {
    isError,
    isLoading,
    isSuccess,
    message: messageLog,
  } = useSelector((state) => state.sendMessage);
  const { filteredSelectedContacts } = useSelector((state) => state.contacts);
  const template = useSelector((state) => state.sendMessage.templateData.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(send());
  };

  const ShowText = () => {
    if (isLoading)
      return (
        <Box sx={{ width: "90%" }}>
          <LinearProgress />
        </Box>
      );
    if (isError || isSuccess)
      return (
        <Typography color="red" borderColor="red">
          {messageLog}
        </Typography>
      );
    if (!template)
      return (
        <Typography
          color="red"
          borderColor="red"
        >{`PLease select a template`}</Typography>
      );
    if (!filteredSelectedContacts || filteredSelectedContacts.length === 0)
      return (
        <Typography
          color="red"
          borderColor="red"
        >{`PLease select contacts to send`}</Typography>
      );

    return (
      <Typography>{`Click to send ${template} to ${filteredSelectedContacts.length} contacts`}</Typography>
    );
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
        <ShowText />
      </Box>
      <Box display="flex" justifyContent="right">
        <Button
          size="large"
          variant="contained"
          disabled={!template || filteredSelectedContacts.length === 0}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default SendAndError;
