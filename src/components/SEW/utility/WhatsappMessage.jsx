import { Box, Typography } from "@mui/material";
import "./whatsapp.css";

function WhatsappMessage(props) {
  return (
    <div className="conversation">
      <div className="conversation-container">
        <div className="message received">
          {props.children}
          <span className="metadata">
            <span className="time">11.08</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default WhatsappMessage;
