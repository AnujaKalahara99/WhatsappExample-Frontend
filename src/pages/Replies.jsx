import * as Realm from "realm-web";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addContactMessage,
  updateContactMessage,
} from "../features/messages/messagesSlice";
import { Paper, Unstable_Grid2 as Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChatList from "../components/replies/ChatList";
import MainChat from "../components/replies/MainChat";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: "center",
  color: theme.palette.text.secondary,
  height: "85vh",
}));

const app = new Realm.App({ id: "application-0-ahwmo" });

const Replies = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState();
  // const [events, setEvents] = useState([]);

  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      // Everytime a change happens in the stream, add it to the list of events
      const collection = mongodb.db("test").collection("messages");

      for await (const change of collection.watch()) {
        const document = JSON.parse(JSON.stringify(change.fullDocument));
        switch (change.operationType) {
          case "insert":
            dispatch(addContactMessage(document));
            break;
          case "update":
            dispatch(updateContactMessage(document));
            break;
          default:
            break;
        }

        // setEvents((events) => [...events, change]);
      }
    };

    login();
  }, []);

  return (
    <Grid container spacing={0} columns={16} marginRight={1}>
      <Grid xs={6}>
        <Item>
          <ChatList />
        </Item>
      </Grid>
      <Grid xs={10}>
        <Item>
          <MainChat />
        </Item>
      </Grid>
    </Grid>
  );
};

export default Replies;
