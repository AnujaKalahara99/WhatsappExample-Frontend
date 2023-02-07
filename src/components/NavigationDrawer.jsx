import { Link } from "react-router-dom";
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import {
  Mail as MailIcon,
  MoveToInbox as InboxIcon,
} from "@mui/icons-material";

let drawerWidth = 240;

const NavigationDrawer = (props) => {
  if (props.drawerWidth) drawerWidth = props.drawerWidth;

  const mainPages = [
    { label: "Dashboard", path: "/" },
    { label: "CreateAd", path: "/createAd" },
    { label: "Messages", path: "/" },
    { label: "Payment", path: "/" },
  ];
  const recentCampaigns = ["2024 A/L Start", "January 1st Sales Offer"];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {mainPages.map((page) => (
            <ListItem key={page.label} disablePadding>
              <ListItemButton component={Link} to={page.path}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={page.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography color={"grey"}>Recent Campaigns</Typography>
        <List>
          {recentCampaigns.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;
