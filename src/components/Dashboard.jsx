import React, { useState } from 'react';
import { Box, Typography, Toolbar, AppBar, IconButton, Drawer, Button, Grid, Card, CardContent, Avatar, Paper } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';  // Import Router components
import MenuIcon from '@mui/icons-material/Menu';
import { deepOrange, deepPurple } from '@mui/material/colors';
import CourseList from './CourseList';
import Notification from './Notification';
import Sidebar from './Sidebar';
import FeatureHighlights from './FeatureHighlights';
import AdminPanel from './AdminPanel';  // Import AdminPanel component

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();  // Hook to programmatically navigate to different routes
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

  const handleSidebarClick = (path) => {
    showNotification(`Navigating to ${path}`, 'info');
    setDrawerOpen(false); // Close the drawer when an item is clicked
    navigate(path);  // Use navigate to go to the selected route
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

        {/* User Profile Section */}
        <Box sx={{ marginBottom: 4, display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 56, height: 56, marginRight: 2 }}>EM</Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
              Welcome, Erick Mongare
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Role: {role === 'admin' ? 'Administrator' : 'User'}
            </Typography>
          </Box>
        </Box>

        {/* Dashboard Overview and Course List */}
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          {/* Statistics Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Courses Enrolled
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: deepPurple[500] }}>
                  12
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Lessons Completed
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: deepOrange[500] }}>
                  34
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Upcoming Deadlines
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Notifications
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                  3
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Course List Section */}
        <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
            My Courses
          </Typography>
          <CourseList />
        </Box>

        {/* Task Overview Section */}
        <Box sx={{ marginTop: 4 }}>
          <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
              Task Overview
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              - Complete React project by next week.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              - Prepare for upcoming client presentation.
            </Typography>
            <Typography variant="body1">
              - Review and update course materials.
            </Typography>
          </Paper>
        </Box>

        {/* Feature Highlights Section */}
        <Box sx={{ marginTop: 4 }}>
          <FeatureHighlights />
        </Box>

        {/* Admin Functions Section */}
        {role === 'admin' && (
          <Box sx={{ marginBottom: 4, marginTop: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Admin Functions</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSidebarClick('/admin-panel')}  // Navigate to AdminPanel
              sx={{
                marginRight: '10px',
                textTransform: 'none',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#155a9d',
                },
              }}
            >
              Manage Courses & Lessons
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
