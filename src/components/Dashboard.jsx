import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Toolbar,
  AppBar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ForumIcon from '@mui/icons-material/Forum';
import DiscussionThread from './DiscussionThread';
import Notification from './Notification';
import Sidebar from './Sidebar';
import ProgressTracker from './ProgressTracker';
const dummyDiscussions = [
  { user: 'Alice', comment: 'Great course!', date: '2024-08-01 10:30 AM' },
  { user: 'Bob', comment: 'I found the lessons very useful.', date: '2024-08-02 1:45 PM' },
];

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [showDiscussions, setShowDiscussions] = React.useState(false);
  const [notification, setNotification] = React.useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDiscussionClick = () => {
    setShowDiscussions(!showDiscussions);
  };
  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
      <Sidebar onDiscussionClick={handleDiscussionClick} />
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/courses">
              <ListItemIcon><SchoolIcon /></ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItem>
            <ListItem button onClick={handleDiscussionClick}>
              <ListItemIcon><ForumIcon /></ListItemIcon>
              <ListItemText primary="Discussions" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* <CourseList /> */}
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/courses">
          Courses
        </Button>
        {showDiscussions && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Latest Discussions
            </Typography>
            <DiscussionThread discussions={dummyDiscussions} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
