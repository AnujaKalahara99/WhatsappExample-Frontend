import StringVariableReplace from "./utility/StringVariableReplace";
import "./utility/whatsapp.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const WhatsappTemplateView = () => {
  const selectedTemplateVariables = useSelector(
    (state) => state.message.templateData
  );
  const selectedTemplate = useSelector((state) =>
    state.template.templates.find(
      (template) => template.name === selectedTemplateVariables.name
    )
  );

  if (!selectedTemplate) return <div></div>;

  return (
    <div className="conversation">
      <div className="conversation-container">
        <div className="message received">
          <StringVariableReplace replaceWith={selectedTemplateVariables.body}>
            {
              selectedTemplate.components.find((com) => com.type === "BODY")
                .text
            }
          </StringVariableReplace>
          <span className="metadata">
            <span className="time">11.08</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WhatsappTemplateView;
