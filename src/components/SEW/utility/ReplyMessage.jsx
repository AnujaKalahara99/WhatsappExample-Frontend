import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

export default function ReplyMessageAccordion(props) {
  return (
    <Accordion>
      <AccordionSummary
        //expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{props.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="conversation">
          <div className="conversation-container">
            {props.children.map((element, i) => {
              return (
                <div key={i} className="message received">
                  {element}
                  <span className="metadata">
                    <span className="time">11.08</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
