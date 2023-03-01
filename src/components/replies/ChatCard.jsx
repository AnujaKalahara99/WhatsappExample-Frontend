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
import { getContactMessages } from "../../features/messages/messagesSlice";

const ChatCard = (props) => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ padding: 1 }}>
      <CardActionArea
        onClick={() => dispatch(getContactMessages(props.recentMessages.wtsp))}
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
                badgeContent={props.recentMessages.unreadMessageCount}
                color="success"
              >
                <Avatar />
              </Badge>
            </Box>
          </Grid>
          <Grid xs={8} spacing={0} sx={{ flexGrow: 1 }}>
            <Grid container spacing={0} columns={1}>
              <Grid xs={8} display="flex" justifyContent="space-between">
                <Typography>{props.recentMessages.wtsp}</Typography>
                <Typography variant="caption">
                  {props.recentMessages.lastMessageTime}
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {props.recentMessages.lastMessage}
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
