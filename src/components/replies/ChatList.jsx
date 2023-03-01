import { CircularProgress, List, Box, Divider } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecentMessageFromAll } from "../../features/contacts/contactSlice";
import ChatCard from "./ChatCard";

const ChatList = () => {
  const dispatch = useDispatch();
  const { recentMessageDetails, isLoading, isError, message } = useSelector(
    (state) => state.contacts
  );
  useEffect(() => {
    dispatch(getRecentMessageFromAll());
  }, [dispatch]);

  if (isLoading || !recentMessageDetails)
    return (
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  return (
    <List>
      {recentMessageDetails.map((e, i) => (
        <div key={i}>
          <ChatCard key={i} recentMessages={e} />
          <Divider
            key={"divider " + i}
            sx={{ borderBottomWidth: 2, borderBottomColor: "black" }}
          />
        </div>
      ))}
    </List>
  );
};

export default ChatList;
