import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  List,
  ListItem,
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import { contacts } from "./utility/Contacts";
import ReplyMessageAccordion from "./utility/ReplyMessage";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const ReplyWindow = () => {
  const [replyMessages, setReplies] = useState([]);
  const [lastCheckedIndex, setLastCheckedIndex] = useState(0);

  useInterval(async () => {
    const response = await fetch(
      "http://kind-red-wombat-yoke.cyclic.app/api/wtsp/messages",
      {
        method: "GET",
        body: JSON.stringify({ lastCheckedIndex }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const json = await response.json();
      if (Object.keys(json).length !== 0) {
        // const allMessagesTemp = [...replyMessages];
        // json.forEach((message) => {
        //   const i = allMessagesTemp.findIndex(
        //     (contactMessages) => contactMessages[0].contact === message.contact
        //   );
        //   if (i !== -1) {
        //     allMessagesTemp[i] = [...allMessagesTemp[i], message];
        //   } else {
        //     allMessagesTemp.push([message]);
        //   }
        // });
        // setReplies(allMessagesTemp);
        setLastCheckedIndex(json[json.length - 1].index);
        setReplies([...replyMessages, json]);
      }
    }
  }, 2500);

  return (
    <Box sx={{ width: "100%", bgcolor: "gray" }}>
      <List sx={{ width: "100%" }}>
        {/* {replyMessages.map((contactMessages, i) => {
          return (
            <ListItem sx={{ width: "100%" }} key={i}>
              <ReplyMessageAccordion name={contactMessages[0].contact}>
                {contactMessages.map((message) => message.text)}
              </ReplyMessageAccordion>
            </ListItem>
          );
        })} */}
        {replyMessages.length !== 0 && (
          <ListItem sx={{ width: "100%" }} key={0}>
            <ReplyMessageAccordion name={replyMessages[0].contact}>
              {replyMessages.map((message) => message.text)}
            </ReplyMessageAccordion>
          </ListItem>
        )}
      </List>
    </Box>
  );
};
export default ReplyWindow;
