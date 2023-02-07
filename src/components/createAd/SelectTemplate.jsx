import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTemplates } from "../../features/wtspTemplates/templateSlice";
import { selectTemplate as selectTemplateAction } from "../../features/wtspTemplates/messageSlice";
import {
  Typography,
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Card,
  CardActionArea,
} from "@mui/material";
import "../SEW/utility/whatsapp.css";
import StringVariableReplace from "../SEW/utility/StringVariableReplace";
import TemplateEditor from "./TemplateEditor";

const SelectTemplate = () => {
  const dispatch = useDispatch();

  const { templates, isError, isLoading, message } = useSelector(
    (store) => store.template
  );

  const selectedTemplateVariables = useSelector(
    (state) => state.message.templateData
  );

  const selectedTemplate = useSelector((state) =>
    state.template.templates.find(
      (template) => template.name === selectedTemplateVariables.name
    )
  );

  useEffect(() => {
    if (templates.length === 0) dispatch(getAllTemplates());
  }, []);

  const handleTemplateSelect = (i) => {
    dispatch(selectTemplateAction(templates[i].name));
  };

  if (isError) return <div>{message}</div>;

  return (
    <div>
      <Typography variant="h5">Select Template</Typography>
      {!selectedTemplate ? (
        <AllTemplates
          templates={templates}
          handleSelect={handleTemplateSelect}
        />
      ) : (
        <div>
          <Button
            onClick={() => {
              dispatch(selectTemplateAction(null));
            }}
          >
            Close
          </Button>
          <WhatsappTemplatePreview variables={selectedTemplateVariables.body}>
            {
              selectedTemplate.components.find((com) => com.type === "BODY")
                .text
            }
          </WhatsappTemplatePreview>
          <TemplateEditor />
        </div>
      )}
    </div>
  );
};

export default SelectTemplate;

function WhatsappTemplatePreview(props) {
  return (
    <div className="conversation">
      <div className="conversation-container">
        <div className="message received">
          {!props.variables ? (
            props.children
          ) : (
            <StringVariableReplace replaceWith={props.variables}>
              {props.children}
            </StringVariableReplace>
          )}
          <span className="metadata">
            <span className="time">11.08</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function AllTemplates(props) {
  return (
    <ImageList sx={{ height: "70vh" }} variant="standard" gap={8}>
      {props.templates &&
        props.templates.map((template, i) => (
          <ImageListItem key={i}>
            <Card>
              <CardActionArea onClick={() => props.handleSelect(i)}>
                <WhatsappTemplatePreview>
                  {template.components.find((com) => com.type === "BODY").text}
                </WhatsappTemplatePreview>
                <ImageListItemBar
                  title={template.name}
                  subtitle={<span>status: {template.status}</span>}
                  position="below"
                />
              </CardActionArea>
            </Card>
          </ImageListItem>
        ))}
    </ImageList>
  );
}
