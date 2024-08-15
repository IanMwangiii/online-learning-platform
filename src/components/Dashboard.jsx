import React, { useState } from 'react';
import { Box, Typography, Toolbar, AppBar, IconButton, Drawer, Button, Grid, Card, CardContent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { deepOrange, deepPurple } from '@mui/material/colors';
import CourseList from './CourseList';
import Notification from './Notification';
import Sidebar from './Sidebar';
import FeatureHighlights from './FeatureHighlights';

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
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

        {/* Statistics Overview Section */}
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: deepOrange[500], color: 'white' }}>
              <CardContent>
                <Typography variant="h5">Courses</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>15</Typography>
                <Typography variant="body2">Active Courses</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: deepPurple[500], color: 'white' }}>
              <CardContent>
                <Typography variant="h5">Students</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>150</Typography>
                <Typography variant="body2">Enrolled Students</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#43a047', color: 'white' }}>
              <CardContent>
                <Typography variant="h5">Instructors</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>8</Typography>
                <Typography variant="body2">Active Instructors</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Admin Functions Section */}
        {role === 'admin' && (
          <Box sx={{ marginBottom: 4 }}>
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

        {/* Course List Section */}
        <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
            My Courses
          </Typography>
          <CourseList />
        </Box>

        {/* Feature Highlights Section */}
        <Box sx={{ marginTop: 4 }}>
          <FeatureHighlights />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
