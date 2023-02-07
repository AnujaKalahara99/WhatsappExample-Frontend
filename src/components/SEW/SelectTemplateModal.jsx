import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Card,
  CardActionArea,
} from "@mui/material";
import WhatsappMessage from "./utility/WhatsappMessage";
import { useSelector, useDispatch } from "react-redux";
import { getAllTemplates } from "../../features/wtspTemplates/templateSlice";
import { selectTemplate } from "../../features/wtspTemplates/messageSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SelectTemplateModal(props) {
  const dispatch = useDispatch();

  const { handleClose } = props;

  const { templates, isError, isLoading, message } = useSelector(
    (store) => store.template
  );

  useEffect(() => {
    if (templates.length === 0) dispatch(getAllTemplates());
  }, [dispatch, templates]);

  const handleSelect = (i) => {
    // const template = {};
    // template.name = templates[i].name;
    // templates[i].components.forEach((element) => {
    //   switch (element.type) {
    //     case "HEADER":
    //       template.header = { type: element.format };
    //       if (element.format === "TEXT") {
    //         template.header.text = element.text;
    //       }
    //       break;
    //     case "BODY":
    //       template.body = { text: element.text };
    //       break;
    //     case "FOOTER":
    //       template.footer = { text: element.text };
    //       break;
    //     default:
    //       break;
    //   }
    // });
    // handleClose(template);
    dispatch(selectTemplate(templates[i].name));
  };

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              All Templates
            </Typography>
            <Button variant="contained">Create New</Button>
          </Box>
          <ImageList
            sx={{ width: 800, height: 460 }}
            variant="standard"
            gap={8}
            cols={3}
          >
            {templates &&
              templates.map((template, i) => (
                <ImageListItem key={i}>
                  <Card>
                    <CardActionArea onClick={() => handleSelect(i)}>
                      <WhatsappMessage>
                        {
                          template.components.find((com) => com.type === "BODY")
                            .text
                        }
                      </WhatsappMessage>
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

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Button onClick={() => handleClose(null)}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
