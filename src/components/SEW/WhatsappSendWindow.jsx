import { Button, Alert, Typography, Divider } from "@mui/material";
import ReplyWindow from "./ReplyWindow";
import SelectContactModal from "./SelectContactModal";
import SelectTemplateModal from "./SelectTemplateModal";
import WhatsappTemplateVariableEditWindow from "./WhatsappTemplateVariableEditWindow";
import WhatsappTemplateView from "./WhatsappTemplateView";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { send } from "../../features/wtspTemplates/messageSlice";

const WhatsappSendWindow = () => {
  const dispatch = useDispatch();

  const sendMessage = useSelector((state) => state.message);
  // const selectedTemplateVariables = useSelector(
  //   (state) => state.message.templateData
  // );
  // const selectedTemplate = useSelector((state) =>
  //   state.template.templates.find(
  //     (template) => template.name === selectedTemplateVariables.name
  //   )
  // );

  const [recipients, setRecipients] = useState([]);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const [bodyParams, setBodyParams] = useState([]);
  const [headerParams, setHeaderParams] = useState([]);

  const [error, setError] = useState("");

  const openContacts = (state, contacts) => {
    setIsContactModalOpen(state);
    if (state === false) setRecipients(contacts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageData = {
      to: recipients,
      //message: sendMessage.messageBody,
      template: sendMessage.templateData.name,
      body_params: bodyParams,
      header_params: headerParams,
    };

    console.log("ToSent ", messageData);

    dispatch(send(messageData));

    // const resposne = await fetch(
    //   "https://kind-red-wombat-yoke.cyclic.app/api/wtsp/messages",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(messageData),
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );

    // if (resposne.ok) {
    //   setRecipients("");
    //   //setSelectedTemplate(null);
    //   setError("");
    //   setBodyParams([]);
    //   setHeaderParams([]);
    // } else {
    //   const json = await resposne.json();
    //   setError(JSON.stringify(json));
    // }
  };

  return (
    <div className="container p-1">
      <div className="row">
        <div className="col-8">
          <div>
            <Typography variant="h6">Choose the audience</Typography>
            <Button onClick={() => openContacts(true, null)}>
              Select Contacts
            </Button>
            <br />
            <Typography variant="caption">
              You have selected {recipients.length} contact(s)
            </Typography>
            <SelectContactModal
              open={isContactModalOpen}
              handleClose={(contacts) => openContacts(false, contacts)}
            />
          </div>
          <Divider />
          <div>
            <Typography variant="h6">Choose a Template</Typography>
            <Button onClick={() => setIsTemplateModalOpen(true)}>
              Select Template
            </Button>
            <br />
            <Typography variant="caption">
              You have selected
              {sendMessage.templateData.name === ""
                ? " none"
                : " " + sendMessage.templateData.name}
            </Typography>
            {isTemplateModalOpen && (
              <SelectTemplateModal
                handleClose={() => setIsTemplateModalOpen(false)}
              />
            )}
          </div>

          <Divider />
          <WhatsappTemplateVariableEditWindow />

          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
          {error !== "" && <Alert severity="error">{error}</Alert>}
        </div>

        <div className="col-4 mt-2">
          <WhatsappTemplateView />
        </div>
      </div>
      {/* <ReplyWindow /> */}
    </div>
  );
};
export default WhatsappSendWindow;
