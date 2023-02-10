import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { send } from "../../features/wtspTemplates/messageSlice";

const SendAndError = () => {
  const dispatch = useDispatch();

  const {
    isError,
    isLoading,
    isSuccess,
    message: errorMessage,
  } = useSelector((state) => state.message);
  const { selectedContacts } = useSelector((state) => state.contacts);
  const template = useSelector((state) => state.message.templateData.name);

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
    if (isError)
      return (
        <Typography color="red" borderColor="red">
          {errorMessage}
        </Typography>
      );
    if (!template)
      return (
        <Typography
          color="red"
          borderColor="red"
        >{`PLease select a template`}</Typography>
      );
    if (!selectedContacts || selectedContacts.length === 0)
      return (
        <Typography
          color="red"
          borderColor="red"
        >{`PLease select contacts to send`}</Typography>
      );

    return (
      <Typography>{`Click to send ${template} to ${selectedContacts.length} contacts`}</Typography>
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
          disabled={!template || selectedContacts.length === 0}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default SendAndError;
