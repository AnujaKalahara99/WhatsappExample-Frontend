import React from "react";
import {
  Modal,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";

import { contacts } from "./utility/Contacts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SelectContactModal(props) {
  const { open, handleClose } = props;
  const [selectedContacts, setSelectedContacts] = React.useState([]);

  const handleToggle = (conID) => () => {
    const currentIndex = selectedContacts.findIndex(
      (element) => element.id === conID
    );
    const newChecked = [...selectedContacts];

    if (currentIndex === -1) {
      newChecked.push(contacts.find((contact) => contact.id === conID));
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedContacts(newChecked);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            All Contacts
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {contacts.map((value) => {
              const labelId = `checkbox-list-label-${value.id}`;

              return (
                <ListItem
                  key={value.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments"></IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value.id)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={
                          selectedContacts.findIndex(
                            (contact) => contact.id === value.id
                          ) !== -1
                        }
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Button onClick={handleClose}>Close</Button>
            <Button
              onClick={() => {
                handleClose(selectedContacts.map((contact) => contact.wtsp));
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
