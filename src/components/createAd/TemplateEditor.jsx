import { TextField } from "@mui/material";
import StringVariableReplace from "../SEW/utility/StringVariableReplace";

import { useSelector, useDispatch } from "react-redux";
import { updateTemplateVariables } from "../../features/wtspTemplates/messageSlice";
import { useEffect, useState } from "react";

const TemplateEditor = () => {
  const dispatch = useDispatch();

  const selectedTemplateVariables = useSelector(
    (state) => state.message.templateData
  );
  const selectedTemplate = useSelector((state) =>
    state.template.templates.find(
      (template) => template.name === selectedTemplateVariables.name
    )
  );

  const [header, setHeader] = useState({});
  const [body, setBody] = useState({});
  const [footer, setFooter] = useState({});

  useEffect(() => {
    setHeader(
      selectedTemplate?.components.find((com) => com.type === "HEADER")
    );
    setBody(selectedTemplate?.components.find((com) => com.type === "BODY"));
    setFooter(
      selectedTemplate?.components.find((com) => com.type === "FOOTER")
    );
  }, [selectedTemplate]);

  const handleHeaderInput = (e, i) => {
    const header_params = [...selectedTemplateVariables.header];
    header_params[i] = { [header.format]: e.target.value };
    dispatch(updateTemplateVariables({ header: header_params }));
  };
  const handleBodyInput = (e, i) => {
    const body_params = [...selectedTemplateVariables.body];
    body_params[i] = e.target.value;
    dispatch(updateTemplateVariables({ body: body_params }));
  };

  if (!selectedTemplate) return <div>No Template Selected</div>;

  return (
    <div className="container mt-5 mb-5">
      {header && (
        <div className="container mt-4">
          <h6>Header</h6>
          {header.format === "TEXT" && (
            <StringVariableReplace
              handle={handleHeaderInput}
              textValue={selectedTemplateVariables.header}
            >
              {header.text}
            </StringVariableReplace>
          )}
          {header.format !== "TEXT" && (
            <div>
              <label>{header.format}</label>
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
      {body && (
        <div className="container mt-4">
          <h6>Body</h6>
          <div>
            <StringVariableReplace
              handle={handleBodyInput}
              textValue={selectedTemplateVariables.body}
            >
              {body.text}
            </StringVariableReplace>
          </div>
        </div>
      )}
      {footer && (
        <div className="container mt-4">
          <h6>Footer</h6>
          {footer.text}
        </div>
      )}
    </div>
  );
};

export default TemplateEditor;
