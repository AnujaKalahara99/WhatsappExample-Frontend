import { Button, Box, List, ListItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { createContacts } from "../features/contacts/contactSlice";

const Contacts = () => {
  const dispatch = useDispatch();
  const { allContacts } = useSelector((state) => state.contacts);
  const handleCreate = () => {
    dispatch(createContacts());
  };
  return (
    <Box>
      <Button size="large" variant="contained" onClick={handleCreate}>
        Save Defaults
      </Button>
      <List>
        {allContacts &&
          allContacts.map((contact, i) => (
            <ListItem key={i}>{JSON.stringify(contact)}</ListItem>
          ))}
      </List>
    </Box>
  );
};

export default Contacts;
