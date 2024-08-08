import React, { useState } from 'react';
import { Box, Typography, Toolbar, AppBar, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CourseList from './CourseList';
import DiscussionThread from './DiscussionThread';
import Notification from './Notification';
import Sidebar from './Sidebar';

const dummyDiscussions = [];

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={drawerOpen}>
        <Sidebar onDiscussionClick={() => showNotification('Discussion clicked!', 'info')} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, padding: 3, marginTop: 8 }}>
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleNotificationClose}
        />
        <Typography variant="h4" gutterBottom>Welcome to the Dashboard</Typography>
        <CourseList />
        <DiscussionThread discussions={dummyDiscussions} />
      </Box>
    </Box>
  );
};

export default Dashboard;
