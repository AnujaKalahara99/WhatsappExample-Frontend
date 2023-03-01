import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addContacts,
  removeAllContacts,
  send,
  updateMessage,
} from "../../features/wtspTemplates/sendMessageSlice";
import "../utility/whatsapp.css";

const MainChat = () => {
  const dispatch = useDispatch();
  const { contactLog, selectedContact } = useSelector(
    (state) => state.messages
  );

  const [msgText, setMsgText] = useState("");

  if (!selectedContact || selectedContact === "")
    return <div>Select a contact</div>;

  const handleSendMsg = () => {
    dispatch(updateMessage(msgText));
    dispatch(send(true));
    setMsgText("");
  };
  return (
    <div className="chat">
      <div className="chat-container">
        <div className="user-bar">
          <div className="avatar">
            <Avatar />
          </div>
          <div className="name">{selectedContact}</div>
          <div className="status">Online</div>
        </div>
        <div className="conversation">
          <div className="conversation-container">
            {contactLog &&
              contactLog.map((m, i) => (
                <WhatsappMessage
                  key={i}
                  isRecieved={m.isRecieved}
                  body={m.body}
                  time={m.createdAt}
                  header={m.header}
                  footer={m.footer}
                />
              ))}
          </div>
          <div className="conversation-compose">
            <Box
              sx={{
                width: "100%",
                marginX: 2,
                paddingX: 2,
                borderRadius: 8,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                variant="standard"
                placeholder="Type a messsage..."
                fullWidth
                value={msgText}
                onChange={(e) => {
                  setMsgText(e.target.value);
                }}
              />
              <Button
                variant="contained"
                sx={{ borderRadius: 8 }}
                onClick={() => handleSendMsg()}
              >
                Send
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

function WhatsappMessage(props) {
  return (
    <div className={props.isRecieved ? "message received" : "message sent"}>
      {props.header.type === "text" && (
        <div className="header">{props.header.data}</div>
      )}
      <div>{props.body}</div>
      {props.footer !== "" && <div className="footer">{props.footer}</div>}
      <span className="metadata">
        <span className="time">{props.time}</span>
        {props.isRecieved && <span className="tick">&</span>}
      </span>
    </div>
  );
}

export default MainChat;
