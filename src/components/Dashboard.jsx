import React, { useState } from 'react';
import { Box, Typography, Toolbar, AppBar, IconButton, Drawer, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CourseList from './CourseList';
import DiscussionThread from './DiscussionThread';
import Notification from './Notification';
import Sidebar from './Sidebar';
import DiscussionForm from './DiscussionForm';
import FeatureHighlights from './FeatureHighlights';  // Import the FeatureHighlights component

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
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1976d2' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={drawerOpen} onClose={toggleDrawer} PaperProps={{ sx: { width: 240 } }}>
        <Sidebar onClick={handleSidebarClick} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, padding: 3, marginTop: 8 }}>
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleNotificationClose}
        />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Welcome to the Dashboard
        </Typography>
        {role === 'admin' && (
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>Admin Functions</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSidebarClick('/manage-courses')}
              sx={{
                marginRight: '10px',
                textTransform: 'none',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#155a9d',
                },
              }}
            >
              Manage Courses
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSidebarClick('/manage-lessons')}
              sx={{
                textTransform: 'none',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#155a9d',
                },
              }}
            >
              Manage Lessons
            </Button>
          </Box>
        )}
        <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <CourseList />
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <DiscussionForm onAddDiscussion={handleAddDiscussion} />
          <DiscussionThread discussions={discussions} />
        </Box>
        <Box sx={{ marginTop: 4 }}> {/* Add FeatureHighlights component here */}
          <FeatureHighlights />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
