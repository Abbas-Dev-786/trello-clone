import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const Sidebar = () => {
  const theme = useTheme();
  const [open, setDrawer] = useState(false);

  const list = (
    <Box sx={{ width: 250 }} role="presentation">
      <ListItem sx={{ justifyContent: "end" }}>
        <IconButton onClick={() => setDrawer(false)}>
          <KeyboardArrowLeftIcon />
        </IconButton>
      </ListItem>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        sx={{
          position: "fixed",
          top: "10%",
          zIndex: 999,
          background: theme.palette.primary.main,
          color: "white",
          "&:hover": {
            background: theme.palette.primary.dark,
          },
        }}
        onClick={() => setDrawer(true)}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setDrawer(false)}>
        <Toolbar />
        {list}
      </Drawer>
    </>
  );
};

export default Sidebar;
