import { Button, TextField, Box, Autocomplete, Alert } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import StringVariableReplace from "./StringVariableReplace";

const MessageSendWindow = () => {
  const recipientList = ["94763891917", "94768608824"];

  const [templates, setTemplates] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [bodyParams, setBodyParams] = useState([]);
  const [headerParams, setHeaderParams] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://kind-red-wombat-yoke.cyclic.app/api/message")
      .then((res) => res.json())
      .then((data) => {
        const templateNames = data.map((element) => element.label);
        setTemplates(templateNames);
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleRecipientChange = (e, value) => {
    const recipientString = value ? value.toString() : "";
    setRecipient(recipientString);
  };

  const handleTemplateChange = async (e, value) => {
    if (!value) {
      return setSelectedTemplate(null);
    }
    fetch(`https://kind-red-wombat-yoke.cyclic.app/api/message/${value}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedTemplate(data);
      })
      .catch((err) => setError(err.message));
  };

  const handleHeaderInput = (e, i) => {
    if (selectedTemplate.header.type === "TEXT") {
      const current_headerParams = headerParams;
      current_headerParams[i] = e.target.value;
      setHeaderParams(current_headerParams);
    } else {
      var json = [{}];
      const headerType = selectedTemplate.header.type.toLowerCase();
      json[0][headerType] = e.target.value;
      setHeaderParams(json);
    }
  };

  const handleBodyInput = (e, i) => {
    const current_bodyParams = bodyParams;
    current_bodyParams[i] = e.target.value;
    setBodyParams(current_bodyParams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageData = {
      to: recipient,
      template: selectedTemplate ? selectedTemplate.name : "",
      body_params: bodyParams,
      header_params: headerParams,
    };

    console.log("ToSent ", messageData);

    const resposne = await fetch(
      "https://kind-red-wombat-yoke.cyclic.app/api/message",
      {
        method: "POST",
        body: JSON.stringify(messageData),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (resposne.ok) {
      setRecipient("");
      setSelectedTemplate(null);
      setError("");
      setBodyParams([]);
      setHeaderParams([]);
    } else {
      const json = await resposne.json();
      setError(json.error.message ? json.error.message : json.error);
    }
  };

  return (
    <div className="container">
      <Box sx={{ borderRadius: 2, boxShadow: 1 }}>
        <div className="mt-5">
          <Autocomplete
            disablePortal
            id="recipient-autocomplete"
            onChange={handleRecipientChange}
            value={recipient === "" ? null : recipient}
            options={recipientList}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Recipient Number" />
            )}
          />
        </div>
        <div className="mt-3 mb-5">
          <Autocomplete
            disablePortal
            id="template-autocomplete"
            options={templates}
            value={selectedTemplate ? selectedTemplate.name : null}
            onChange={handleTemplateChange}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Template" />}
          />
        </div>
      </Box>

      <Box sx={{ borderRadius: 2, boxShadow: 2 }}>
        {selectedTemplate && (
          <div className="container mt-5 mb-5">
            {selectedTemplate.header && (
              <div className="container mt-4">
                <h6>Header</h6>
                {selectedTemplate.header.type === "TEXT" && (
                  <StringVariableReplace handle={handleHeaderInput}>
                    {selectedTemplate.header.text}
                  </StringVariableReplace>
                )}
                {selectedTemplate.header.type !== "TEXT" && (
                  <div>
                    <label>{selectedTemplate.header.type}</label>
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      placeholder="url"
                      onChange={handleHeaderInput}
                    />
                  </div>
                )}
              </div>
            )}
            {selectedTemplate.body && (
              <div className="container mt-4">
                <h6>Body</h6>
                <div>
                  <StringVariableReplace handle={handleBodyInput}>
                    {selectedTemplate.body.text}
                  </StringVariableReplace>
                </div>
              </div>
            )}
            {selectedTemplate.footer && (
              <div className="container mt-4">
                <h6>Footer</h6>
                {selectedTemplate.footer.text}
              </div>
            )}
          </div>
        )}
      </Box>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      {error !== "" && <Alert severity="error">{error}</Alert>}
    </div>
  );
};
export default MessageSendWindow;
