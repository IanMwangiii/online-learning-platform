import React, { useState } from 'react';
import { Box, Typography, Toolbar, AppBar, IconButton, Drawer, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CourseList from './CourseList';
import Notification from './Notification';

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

  const handleEnroll = (courseId) => {
    // Handle enrollment logic here
    console.log(`Enrolled in course ${courseId}`);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        {/* Drawer content here */}
      </Drawer>
      <CourseList enrolledCourses={[]} onEnroll={handleEnroll} />
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleNotificationClose}
      />
    </Box>
  );
};

export default Dashboard;
