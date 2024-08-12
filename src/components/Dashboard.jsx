import React, { useState } from 'react';
import { Box, Typography, Toolbar, AppBar, IconButton, Drawer, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CourseList from './CourseList';
import DiscussionThread from './DiscussionThread';
import Notification from './Notification';
import Sidebar from './Sidebar';
import DiscussionForm from './DiscussionForm'; // Import the DiscussionForm component

const dummyDiscussions = [
  { user: 'Alice', comment: 'Great course!', date: '2024-08-01 10:30 AM' },
  { user: 'Bob', comment: 'I found the lessons very useful.', date: '2024-08-02 1:45 PM' },
];

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [discussions, setDiscussions] = useState(dummyDiscussions);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  const role = localStorage.getItem('role'); // Get the role from localStorage

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleAddDiscussion = (newComment) => {
    const newDiscussion = {
      user: 'Current User', // Replace with actual user
      comment: newComment,
      date: new Date().toLocaleString(),
    };
    setDiscussions([...discussions, newDiscussion]);
  };

  const handleSidebarClick = (path) => {
    showNotification(`Navigating to ${path}`, 'info');
    setDrawerOpen(false); // Close the drawer when an item is clicked
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
      <Drawer variant="temporary" open={drawerOpen} onClose={toggleDrawer}>
        <Sidebar onClick={handleSidebarClick} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, padding: 3, marginTop: 8 }}>
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleNotificationClose}
        />
        <Typography variant="h4" gutterBottom>Welcome to the Dashboard</Typography>
        {role === 'admin' && (
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6">Admin Functions</Typography>
            <Button variant="contained" color="primary" onClick={() => handleSidebarClick('/manage-courses')} style={{ marginRight: '10px' }}>
              Manage Courses
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleSidebarClick('/manage-lessons')}>
              Manage Lessons
            </Button>
          </Box>
        )}
        <CourseList />
        <DiscussionForm onAddDiscussion={handleAddDiscussion} />
        <DiscussionThread discussions={discussions} />
      </Box>
    </Box>
  );
};

export default Dashboard;
