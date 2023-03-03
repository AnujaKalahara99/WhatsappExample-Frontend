import {
  Avatar,
  Card,
  CardActionArea,
  Typography,
  Unstable_Grid2 as Grid,
  Box,
  Chip,
  LinearProgress,
  CardContent,
  Badge,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { markContactRead } from "../../features/messages/messagesSlice";
import { getContactMessages } from "../../features/messages/messagesSlice";

const ChatCard = (props) => {
  const dispatch = useDispatch();
  const lastMsgTime = new Date(props.recentMessage.lastMessageTime);

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  return (
    <Box sx={{ padding: 1 }}>
      <CardActionArea
        onClick={() => {
          dispatch(getContactMessages(props.recentMessage.wtsp));
          dispatch(markContactRead(props.recentMessage.wtsp));
        }}
      >
        <Grid container spacing={0} columns={16}>
          <Grid xs={4}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Badge
                badgeContent={props.recentMessage.unreadMessageCount}
                color="success"
              >
                <Avatar />
              </Badge>
            </Box>
          </Grid>
          <Grid xs={8} spacing={0} sx={{ flexGrow: 1 }}>
            <Grid container spacing={0} columns={1}>
              <Grid xs={8} display="flex" justifyContent="space-between">
                <Typography>{props.recentMessage.wtsp}</Typography>
                <Typography variant="caption">
                  {formatAMPM(lastMsgTime)}
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {props.recentMessage.lastMessage}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={50} sx={{ margin: 1 }} />
      </CardActionArea>
    </Box>
  );
};

export default ChatCard;
